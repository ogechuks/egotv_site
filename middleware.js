// middleware.js
// Root of the repo — Vercel runs this at the edge before any
// matching request reaches the site. Only /notes.html is checked;
// everything else on the site loads exactly as before.

import { verifySessionToken } from './lib/auth.js';

export const config = {
  matcher: '/notes.html',
};

export default async function middleware(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|;\s*)notes_session=([^;]+)/);
  const token = match ? match[1] : null;

  const valid = await verifySessionToken(token, process.env.NOTES_SECRET);

  if (!valid) {
    return Response.redirect(new URL('/login.html', request.url));
  }
}
