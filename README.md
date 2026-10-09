# Concept Home Interior – website

Live: https://aziz4rehman-hue.github.io/concept-home/

## Change text
All words on the site are in `src/content.ts` – headline, collections, workshop steps, spec sheet, contact details.

## Add or change photos
1. Put the photo in `photos/` with a simple name, e.g. `bed-walnut-king.jpg`.
2. Add a line for it in `src/photos.ts` (name, category, short description).
3. To show it on a collection card, set `photo: 'bed-walnut-king'` for that card in `src/content.ts`.

Photos are converted to small WebP files automatically.

## See it on your computer
```
npm install
npm run dev
```

## Publish
Commit and push to `main`. GitHub builds and publishes the site in about 2 minutes.

## Custom domain
See `DOMAIN-SETUP.md`.
