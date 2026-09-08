# jstnlt.my.id

Personal site for Jastin Linggar Tama. Next.js 15.2 (App Router) · React 19 · Tailwind v4 · TypeScript.

---

## How to work on this

**The user runs the dev server themselves on port 3000.** Do not run `pnpm build`, do not
`rm -rf .next`, do not start a second server. Both would fight the running process. Verify with:

```bash
npx tsc --noEmit                    # typecheck
curl -s http://127.0.0.1:3000/      # read the rendered DOM
```

Reading the dev server's HTML and its CSS bundle (`/_next/static/css/...`) is the fastest way to
confirm a change actually landed. HMR sometimes serves stale output for a few seconds after a
GSAP-style module swap; re-fetch before concluding something is broken.

**Never commit without the user reviewing in their IDE first.**

---

## Writing rules

- **Never use an em-dash (`—`) anywhere.** Not in copy, not in comments, not in date ranges.
  Rewrite the sentence instead of swapping the character. Ranges read `Jul 2022 to present`.
- Curly quotes, `…` not `...`.
- Copy is the user's own words, taken from his LinkedIn, CV and GitHub profile README.
  **Do not invent facts, metrics, or descriptions.** If a number is needed and none exists,
  leave a hole rather than filling it.

---

## Design system

Tokens live in `tokens.css` at the project root and are imported by `src/app/globals.css`.
Everything is OKLCH. **Light mode is the default and the direction.**

| Layer | Token | Notes |
| --- | --- | --- |
| Page | `--color-paper`, `-2`, `-3` | sections alternate paper / paper-2 |
| Text | `--color-ink`, `--color-muted`, `--color-neutral` | |
| Accent | `--color-accent` | vermilion, the only saturated hue |
| | `--color-accent-text` | darker, for small text that needs 4.5:1 |
| Panel | `--color-panel`, `-2`, `--color-on-panel*` | **dark in both themes** |
| Chart | `--color-lang-1..7` | one hue, seven steps |
| Calendar | `--color-grid-0..4` | contribution ramp |

**`--color-panel` is not `--color-ink`.** Ink inverts with the theme, so painting the contact
block with it turned that block into a near-white slab in dark mode. A panel stays dark in both
themes; in dark mode it simply reads as a raised surface.

Surface order on the home page:

```
hero paper · what-i-do paper · open-source paper-2 · on-my-own paper
on-a-team paper-2 · commits paper · competitions paper-2 · contact panel · footer paper
```

The calendar section must stay on `paper`: its empty cells are `oklch(91%)`, only 2.5% off
`paper-2` but 6.6% off `paper`.

**Type:** one webfont only. `Bricolage Grotesque` (display, `font-stretch: 78%`) over the system
UI stack for body. `.display` tracks `-0.035em`, which makes heavy condensed letters overlap; that
is fine filled but shows every crossing if the type is ever outlined.

**Geist is not to come back**, and neither are Inter, Space Grotesk or italic Instrument Serif.
Those four are what every generator reaches for, so they now read as machine-picked whatever the
layout around them does. If a body face is ever wanted over the system stack, it has to be one
with a foundry that can be named.

**`.label` is sentence case.** It was uppercase at `0.18em` for 75 instances, which is the most
templated move available in this kind of layout. The copy was already written in sentence case, so
nothing had to be reworded when the `text-transform` came off. Size, weight and `--color-neutral`
carry the register now. Do not put `text-transform: uppercase` back on it, and do not pair it with
positive tracking.

**Verify contrast numerically before shipping a colour.** Convert the OKLCH values to sRGB and
compute WCAG ratios; do not eyeball it. Body text 4.5:1, large text and UI boundaries 3:1.

---

## Data

Nothing about the work is hand-maintained any more.

- `src/lib/github.ts` reads the GitHub REST and GraphQL APIs, cached one hour.
  - `getRepos()` merges the personal account with four repos he authored under organisations,
    listed explicitly in `AUTHORED_ELSEWHERE`. **Do not pull whole orgs.** An org also holds
    other people's work, and counting it would overclaim.
  - `getContributions()` needs `GITHUB_TOKEN` (already in `.env`, also used by `/api/stats`).
  - `ogCard(fullName)` takes `owner/name`, not just the repo name.
- `src/data/profile.ts`: positioning, about, the Affandra practice, production work, roles, stack.
- `src/data/highlights.ts`: five open-source projects, each with the decision worth naming.
  Star counts come from the live repo list; the `metric` field is only a fallback.
- `src/data/achievements.ts`: six placements with issuers, plus `LKS_NOTE`.
- `src/data/socials.ts`

Live totals at the time of writing: 58 repos, 573 stars, 309 forks, 3,630 contributions.

---

## Positioning, and what the user does not want

He is a **fullstack developer**, not a student who makes bots. Backend-leaning: Go, PHP,
TypeScript, Kubernetes.

Two work threads, and **the freelance one comes first** because it is longer and it is his:

1. **Affandra Solusi Teknologi** (Jul 2022 to present), the software arm of his vocational
   school, run as a freelance practice with a small team. 41 repos in the org.
2. **Cazh** (2025 to present), the day job.

Hard constraints he has stated:

- **The employer is named exactly once**, as a credit line under the timeline. The site is about
  him, not about Cazh.
- **Affandra content must not mirror the Cazh work domain.** He raised a legal concern about
  this. Describe Affandra from what is publicly visible in its GitHub org (institution websites,
  PKL tracking, a wedding invitation product, CI/CD tooling, `katla-rs`), not from school
  management or billing modules.
- **Do not lean on Indonesian identity as decoration.** A wall of 544 regency crests from his
  own `indonesia-logo` dataset was rejected: "kesannya gue Indonesia banget".
- He has a **small team**, so do not write copy claiming he does everything alone.

---

## Not a copy of the reference

The site was built by studying `adianvel.me`, which he supplied. An early revision reproduced its
**structure**, not just its energy, and he called it out as plagiarism: centred three-line
uppercase headline with inline colour blocks, `MY [X] WORK`, a multi-colour bar stack, and a
repeating scrolling band.

Those are all gone. Do not reintroduce them. Also off limits, because they are that site's
signature: the 3D lanyard card with rapier physics, halftone dot fields, hand-drawn arrows,
glowing badges, and its cobalt/lime/pink palette.

The ornament here is `CommitField`: 371 days of his real contributions rendered as an SVG dot
field. The ornament is his data.

---

## Motion

- **Lenis** drives scrolling (`src/components/smooth-scroll.tsx`). It animates the real scroll
  position, so IntersectionObserver and sticky still work. It also owns same-page anchor jumps,
  which is why `scroll-behavior: smooth` is deliberately absent from `globals.css`.
- Remaining motion: rAF count-up on the figures, language bar sibling hover, calendar tooltip,
  nav underline wipe, link and button hovers.

**Reveal animations were removed after seven rounds of failures.** `RevealLines` and `Stagger`
are passthrough components now, kept only so their seventeen call sites did not have to change.
The failure modes, so they are not rediscovered:

1. ScrollTrigger measures offsets at mount; 45 remote OG images load afterwards and invalidate them.
2. A CSS `translateY(115%)` is resolved to a pixel matrix before GSAP reads it, so GSAP sees
   `yPercent: 0` and animating it moves nothing. `fromTo` is required, not `to`.
3. Trailing whitespace collapses at the end of an `inline-flex` mask, so words run together. The
   space must sit between the masks.
4. These are client components, so anything parked in JS flashes visible before hydration. Parking
   must happen in CSS, gated on a class set by a pre-paint inline script.
5. An IntersectionObserver `threshold` is unreliable once the root is shrunk by a negative margin.
6. Triggering at 75% of the viewport means a slow scroll never sees the animation.

If it is ever brought back, build it as CSS transitions plus one class toggle, and expect to solve
all six.

`gsap` and `@gsap/react` are still in `package.json` but **no source file imports them**.

---

## Known issues, not fixed

Flagged to the user, deliberately left alone:

- **`src/lib/ratelimit.ts` is broken.** Every caller passes the literal token `"CACHE_TOKEN"`, so
  there is one global bucket rather than one per IP. Three submissions from anyone locks out
  everyone for an hour, and the error message claims a per-IP limit that does not exist.
- **`src/app/api/sendmessage/route.ts` interpolates user input** into a `parse_mode=html` Telegram
  URL with no escaping and no `encodeURIComponent`. An `&` or a `<b>` in the form breaks or
  injects.
- `/api/stats` and `src/data/projects.ts` are orphaned; the home page reads GitHub directly now.
- `src/components/language-bars.tsx` is orphaned. It also has a dark-mode bug: `text-paper` on
  `lang-1`/`lang-2` is dark-on-dark once the theme flips.

---

## Assets

Project imagery is GitHub's own per-repo social card (`opengraph.githubassets.com/1/owner/name`):
real, free, always current. It is not a substitute for screenshots of the live products
(`whatscode`, `fana`, `s3-explorer`, `v1`, `quran`, the Discord landing page all still resolve).
If the user supplies screenshots, wire them in ahead of the OG cards.

---

## Design log

`.hallmark/log.json` records every revision, why it happened, and what was rejected. Read it
before changing direction on anything visual; a lot of what looks like an obvious improvement has
already been tried and turned down.

---

## The character

Four flat illustrations of him, generated elsewhere from a photo and finished here.
`src/components/character.tsx` is the only consumer, in two variants: `hero` (home) and
`lost` (`not-found.tsx`).

| File | Pose | Where |
| --- | --- | --- |
| `public/char/frame-idle.webp` | standing, laptop under one arm | hero, default |
| `public/char/frame-laptop.webp` | open MacBook, typing, looking down | hero, comes round on its own |
| `public/char/frame-wave.webp` / `frame-wave2.webp` | wave, two frames | hero, on click |
| `public/char/frame-404.webp` | scratching his head | the 404 page |

Sources are kept beside them (`hero.png`, `pose-*.png`) because every frame is reprocessed
from source, never from a previous export.

**Registration is the whole game.** Frames come from separate generations, so they never
match on their own. Each is scaled so the figure height equals `hero.png`'s, then anchored
by the horizontal centre of the top 12% of the silhouette (the head) and by the bottom of
the silhouette (the soles). The head anchor matters: anchoring on the feet threw the laptop
pose 15px sideways, because his stance widens in it. The hero frames then share one canvas
sized to the widest pose, 463x1038. **A canvas trimmed to the idle pose alone clips the
laptop and the raised hand.** The 404 frame stands alone at 413x1038.

Two corrections that are always needed:

- **Palette.** Each generation lands a few percent off. Skin and jeans are matched to
  `hero.png` by a per-channel multiplier on those pixels only, iterated until the medians
  agree, because scaling on export moves the result. Multiply, do not add: it keeps the cel
  shading intact. Shirt and hair are left alone, they land within 1%.
- **Whatever the model invented.** The five sleeve flowers have been wrong in every
  generation: wrong sleeve, wrong count, crowded against the inner edge. On the real garment
  they run down the *outer* edge of one sleeve and are clipped by its contour. On the wave
  frames they were removed in Pillow instead of regenerated: mask the yellow clusters that
  sit on the sleeve, leave the ones inside the chest lettering, fill flat white while
  protecting pixels darker than 90 so the outline survives.

The wave pair also differed in the face, which no colour match fixes. Fixed by compositing:
frame B keeps its arm, but takes A's head above `y=192` and A's body below `y=515`. Those
two cut lines were chosen by measuring every row: at 192 the neck edges differ by 1px, 25
rows lower the shoulders differ by 5. Face pixels differing dropped from 1674 to 81. The
torso still shifts by a pixel and cannot be patched, no rectangle inside the shirt has four
matching borders.

**Motion** lives in `globals.css` under `@layer components`, prefixed `char-`. Three idle
rhythms on unrelated periods (breath 4.6s, sway 6.7s, weight shift 9.1s) so the loop never
visibly repeats, plus a contact shadow that squashes with the breath and a lean toward the
cursor. The lean moves the whole figure. **Do not cut the art into limbs.** A head layer
rotating on the neck showed the seam immediately, and an arm cannot be lifted out at all
because it merges into the torso at the shoulder.

The wave alternates its two frames every 260ms **with the crossfade switched off**
(`.char--snap`). Cross-fading them leaves both images half transparent for a frame, which
reads as a white blink. The fade stays on the way in and out.

The automatic pose fires every 9 to 14 seconds, randomised: a fixed beat gets memorised
after two cycles and stops being seen. It skips when the tab is hidden or a click-triggered
wave is still running.

**Prompting for a new pose is written up in `docs/character-prompts.md`**: the two prompt
skeletons (generate from `hero.png`, correct an existing frame), the phrasings that survive
contact with the model, and a table of every failure that has actually happened. Read it
before writing a prompt, and update it when a new failure shows up.

`public/proposals.html` is the single scratch page where all of this was shown before it was
built. Edit it in place, never add a second one.
