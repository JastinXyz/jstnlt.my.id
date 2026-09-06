# jstnlt.my.id

My personal site. Next.js 15 on the App Router, React 19, Tailwind v4, TypeScript.

The parts worth stealing are probably the GitHub reader in `src/lib/github.ts`,
the contribution calendar, and the way the drawn character is put together.

## Running it

```bash
pnpm install
cp .env.example .env      # see the comments in that file
pnpm dev
```

Nothing in `.env` is required to boot. Without `GITHUB_TOKEN` the repo list,
the totals and the contribution calendar come back empty and the rest of the
site renders as normal.

## Layout

```
src/app/          routes; every page is a server component with client islands
src/components/   the shared pieces, one job each
src/data/         the written content: profile, highlights, achievements, socials
src/lib/          GitHub readers, auth config, small helpers
src/styles/       tokens.css, the whole design system as CSS custom properties
public/char/      the character frames the site actually loads, webp only
public/shots/     product screenshots
assets/char/      the raw art and every intermediate, not served
```

## How the data works

Nothing about the work is hand maintained. `src/lib/github.ts` reads the REST
and GraphQL APIs, cached for an hour, and everything else reads from that:

- `getAllRepos()` is every public repo, which is what the star and fork counts
  on the home page are drawn from.
- `getRepos()` is the same list minus `HIDDEN`, which is the curated set the
  site actually shows. Add a name to that set and it disappears from the work
  page, the home page and every total at once.
- Repos authored under an organisation are listed explicitly in
  `AUTHORED_ELSEWHERE`. Whole orgs are never pulled: an org holds other
  people's work too.

The written content lives in `src/data`. It is the only place with sentences in
it that are not UI copy.

## The character

The illustrations are generated from photos of me and then finished in Pillow: trimmed, colour matched to a single reference so the frames
do not flicker, and composited so a swap only changes what should move. The
prompts and the pipeline are written up in [`docs/character-prompts.md`](docs/character-prompts.md).

Only the webp exports live under `public`. The sources and every intermediate
sit in `assets/char`, which the server never touches.

## Licence

Code is MIT, see [LICENSE](LICENSE).

The content is not: the character illustrations, the screenshots, the
photographs behind them, and the written copy in `src/data` are mine and are
not covered by that licence. Fork the code, not the person.
