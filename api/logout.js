// api/logout.js
// Clears the session cookie server-side (it's HttpOnly, so JS in
// the browser can't clear it directly) and sends you back home.

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
      'Set-Cookie': 'notes_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  });
}
