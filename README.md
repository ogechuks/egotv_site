# egotv777.com — Site Files

## File Structure

```
egotv_site/
├── index.html       ← Split landing page (main entry point)
├── oge.html         ← OGE developer portfolio
├── egotv.html       ← EGO TV agency page (coming soon)
└── assets/
    └── egotv_logo.jpg   ← Drop your logo here
```

## Before Deploying

1. **Add your logo** — create an `assets/` folder and drop `egotv_logo.jpg` inside it
2. **Update links in oge.html:**
   - GitHub: `https://github.com/yourusername`
   - LinkedIn: `https://linkedin.com/in/yourprofile`
   - Email: `your@email.com`
3. **Update links in index.html** — same GitHub/social links

## Deploying to egotv777.com

### Option A — Netlify (easiest, free)
1. Go to netlify.com and sign up
2. Drag and drop the `egotv_site/` folder onto the Netlify dashboard
3. Netlify gives you a live URL instantly
4. Go to Domain Settings → add `egotv777.com`

### Option B — Vercel
1. Push the folder to a GitHub repo
2. Go to vercel.com → Import Project → select the repo
3. Add `egotv777.com` as a custom domain in project settings

### Option C — Manual FTP
Upload all files to your hosting provider's `public_html` folder via FTP

## Notes
- No build step needed — pure HTML/CSS/JS
- Fonts load from Google Fonts — requires internet connection
- Logo path is `assets/egotv_logo.jpg` — keep that exact filename
