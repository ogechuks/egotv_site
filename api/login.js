// api/login.js
// Checks the submitted password against NOTES_PASSWORD, which is
// set in Vercel's environment variables — never in this file, never
// in git. On success, sets a signed cookie that middleware.js checks
// on every request to /notes.html.

import { createSessionToken } from '../lib/auth.js';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let password;
  try {
    const body = await request.json();
    password = body.password;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.NOTES_PASSWORD || password !== process.env.NOTES_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: 'Wrong password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = await createSessionToken(process.env.NOTES_SECRET, 30);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `notes_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
    },
  });
}
