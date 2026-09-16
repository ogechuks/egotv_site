// lib/auth.js
// Shared between middleware.js and api/login.js.
// Creates and checks a signed session token using Web Crypto —
// works in Vercel's Edge runtime, no npm packages needed.

function toBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toBase64Url(signature);
}

// Creates a signed token valid for `daysValid` days.
export async function createSessionToken(secret, daysValid = 30) {
  const expiry = Date.now() + daysValid * 24 * 60 * 60 * 1000;
  const payload = String(expiry);
  const signature = await hmac(payload, secret);
  return `${payload}.${signature}`;
}

// Checks a token's signature and expiry. Returns true or false.
export async function verifySessionToken(token, secret) {
  if (!token || !secret) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expected = await hmac(payload, secret);
  if (expected !== signature) return false;

  const expiry = Number(payload);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;

  return true;
}
