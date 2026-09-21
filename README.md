# Grounded Power Electric — New Site (React + Tailwind + Vite)

## Commands
- `npm install` — install deps
- `npm run dev` — local dev at http://localhost:3000
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the build

## Files
- `index.html` — Vite entry + SEO + schema
- `src/App.jsx` — all page sections (hero, services, why, work, reviews, areas, FAQ, quote, footer)
- `src/index.css` — Tailwind v4 theme (cream/bark/bulb/leaf) + paper texture + bulb glow
- `public/logo-tree.png` — tree-only mark (header, hero, favicon)
- `public/logo.png` — full lockup with text (footer, social share)
- `legacy-static.html` / `legacy-styles.css` / `legacy-script.js` — old static version, safe to delete

## Before launch — replace these 5 things
1. Phone: search-replace `(803) 555-0147` + `+18035550147` with real number
2. Email: `hello@groundedpowerelectric.com` → real inbox
3. Owner photo: in `#why` `.owner-photo` — swap gray box for real photo of Derrick + van
4. Gallery: in `#work` — swap 6 gray boxes for real phone photos (panel before/after = best)
5. Reviews + Map: in `#reviews` / `#areas` — embed real Google reviews + Google Maps iframe
6. License #: add real SC license # in FAQ + footer

## Make the form live (pick 1, 5 min)
Current form only shows "Sent ✓" + `console.log`. To receive emails:
- Easiest: https://formspree.io → create form → paste endpoint into `script.js` TODO (uncomment fetch)
- Or host on Netlify: add `netlify` attribute to `<form>`, submissions appear in dashboard
- Or Vercel + Resend if you want SMS notifications

## Preview locally
`python3 -m http.server --directory .` → http://localhost:8000

## Deploy (free, fast)
- Netlify Drop: drag this folder to app.netlify.com/drop → point GoDaddy DNS to it
- Or Vercel: `vercel deploy`
- Keep GoDaddy domain, ditch GoDaddy Website Builder hosting.

## Next upgrades (when ready)
- Separate pages: `/ev-charger-installation-columbia-sc/`, `/panel-upgrade/` for Google ranking
- Google Business Profile + 10 reviews → embed here
- Add online booking (Calendly / Square Appointments)
