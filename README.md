# EnglishArena — GitHub Pages English MCQ Website

A fully static English MCQ practice website made with plain HTML, CSS, and JavaScript.

## Main features

- No registration or login
- No PHP, WordPress, database, or backend
- Works on GitHub Pages
- Responsive mobile-friendly design
- 100,000 deterministic question IDs
- Grammar, vocabulary, synonyms, antonyms, spelling, prepositions, and tenses
- Easy, medium, and hard levels
- 10, 20, or 50 questions per test
- Optional timer
- Instant scoring
- Answer review and explanations
- Local browser progress through `localStorage`
- No external JavaScript libraries

## Important note about the 100,000 MCQs

The site does **not** contain 100,000 manually written questions. It contains a deterministic
question generator with 100,000 valid question IDs. Questions are created from curated vocabulary,
grammar rules, templates, answer choices, and seeded variations.

This approach keeps the repository lightweight enough for free static hosting. Some question patterns
may repeat with different IDs, wording, option order, or seeded combinations. For an exam-preparation
business, manually review and expand the source banks in `question-bank.js`.

## Deploy on GitHub Pages

1. Create a new public GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. GitHub will show the public site URL after deployment.

Your URL will normally look like:

`https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

## Test locally

You can open `index.html` directly. For the most reliable local test, run a small server:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Customize the site

- Website text and layout: `index.html`
- Colors, spacing, responsive design: `styles.css`
- Quiz behavior and local progress: `app.js`
- Questions, rules, datasets, and generator: `question-bank.js`

## Static-hosting limitations

GitHub Pages cannot provide:

- User accounts shared across devices
- Server-side admin dashboard
- Central leaderboard
- Payment processing without a third-party service
- Secure private question storage
- Global analytics without a third-party analytics provider
- Shared results database

Visitor progress is saved only in that visitor's browser.

## License

MIT License. You may edit, publish, and use the code commercially.
