# EnglishArena — quality static English learning website

This version expands the original one-page MCQ project into a complete educational website suitable for GitHub Pages or another static host.

## Included

- Original homepage with clear educational purpose
- 10 substantial lesson pages
- Full MCQ quiz with explanations, difficulty levels, timer, and local progress
- About, Contact, Editorial Policy, Privacy, Terms, and Disclaimer pages
- Responsive navigation, keyboard-friendly controls, skip link, and reduced-motion support
- Structured data on the homepage and lesson articles
- `robots.txt`, favicon, web app manifest, 404 page, and sitemap template
- No analytics, advertising, database, login, or third-party JavaScript by default

## Mandatory changes before publishing

1. The contact email is already configured as `mcqenglish16@gmail.com` in `site-config.js`.
2. Search the whole folder for `YOUR-` and replace every remaining placeholder.
3. `sitemap.xml`, canonical links, and `robots.txt` are already configured for `https://mcqenglish.github.io/`.
4. Test every page after deployment.
5. Replace the sample brand/domain details if you choose a different site name.

## GitHub Pages deployment

1. Create a public repository.
2. Upload the contents of this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then save.
6. Wait for GitHub to show the live URL.

## Before applying for AdSense

- Publish the site on a stable URL you control and verify that all pages load.
- Add your real contact method and accurate ownership information.
- Continue adding genuinely useful, original lessons rather than mass-generated thin pages.
- Get real users through legitimate sources; do not buy invalid traffic.
- Update `privacy.html` before adding AdSense or analytics code.
- Add the AdSense verification code exactly as provided by Google.
- After Google gives you a publisher ID, rename `ads.txt.example` to `ads.txt` and replace the placeholder line with the exact authorised-seller line shown in AdSense.
- Use an appropriate consent-management solution where required by law and Google’s consent requirements.
- Do not place ads inside answer choices, next to misleading buttons, or on screens with little publisher content.

## Question-bank note

The quiz engine produces deterministic practice combinations from curated words, rules, templates, and seeded option orders. It does not contain 100,000 individually written questions. This is disclosed on the website. Review and expand `question-bank.js` as your audience grows.

## Files to edit most often

- Site content and structure: HTML files
- Visual design: `styles.css`
- Contact email: `site-config.js`
- Quiz behaviour: `app.js`
- Question sources and generation: `question-bank.js`

## Local preview

Run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.
