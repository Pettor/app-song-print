# Song Print

[![GitHub](https://img.shields.io/badge/license-MIT-green)](https://github.com/Pettor/app-song-print/blob/main/LICENSE)
[![Actions Main](../../actions/workflows/main.yml/badge.svg)](../../actions/workflows/main.yml)
[![Coverage](https://img.shields.io/badge/coverage-%E2%89%A580%25-brightgreen)](../../actions/workflows/ci.yml)
[![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg)](https://pettor.github.io/app-song-print/storybook/)

Turn a song's chords and lyrics into a clean, printable sheet. Each chord sits directly above the
word it lands on, sized and spaced to stay readable from a music stand — so you can follow the
words and the changes at a glance while playing.

```
   Dm          Gm
En enda sak är säker
    A             Dm
och det är livets gång;
```

## 🚀 Demo

Experience the application in action:

- **[Live Application Demo](https://pettor.github.io/app-song-print/app/)** - See the main application
- **[Storybook Component Library](https://pettor.github.io/app-song-print/storybook/)** - Explore the component documentation

## What it does

**Chord-over-lyric layout.** Chords are written inline in the lyric, in brackets, and render as
badges above the word that follows. A chord wider than its word pushes the following words right,
so badges never collide.

**Live JSON editing.** The song is plain JSON in a pane on the left; the sheet re-renders on the
right as you type. Invalid JSON keeps the last good render on screen instead of blanking out, and
a pasted two-line chord tab is offered a one-click conversion to JSON.

**Song structure.** A song is a sequence of named sections — intro, verse, chorus, bridge, outro.
Sections can carry lyrics, a bare chord sequence for instrumental parts, or both.

**Page fitting.** Sections are measured and packed so one is never split across a column unless it
cannot fit a column on its own — and then the continuation is labelled `cont.`. A4, A5 and Letter,
portrait or landscape, in one, two or three columns.

**Transposition.** Shift the whole song by a number of semitones before printing. Slash chords
transpose both halves; markers like `N.C.` are left alone.

**Export.** One click to a paginated PDF at the song's page format, via `html2canvas` + `jsPDF`.

**Files.** Open a song from disk and save it back, in the browser (File System Access API where
available) — no server needed for that part.

## Quick start

Requires Node 21–24 and pnpm (`corepack enable` first).

```bash
pnpm install
pnpm dev
```

The app runs at `https://localhost:5235` (self-signed cert — accept the browser warning on first
visit).

By default you'll see one example song. To load your own library, point `SONGS_DIR` at a folder of
individual song files:

```bash
SONGS_DIR=/path/to/your/songs pnpm dev
```

or drop it in a gitignored `apps/web/.env.local` so you don't have to set it every time:

```
SONGS_DIR=/path/to/your/songs
```

Every `*.json` file directly inside that folder is loaded as one song — the filename becomes its
id, and its `title` becomes the label in the song picker. This keeps your actual song library
(lyrics, chords) out of this repo entirely; only the app code lives here. Saving from the editor
panel (dev server only) writes straight back into the matching file in `SONGS_DIR`.

Presets are loaded from a `virtual:songs` module that `songsDirPlugin` (`configs/vite/src/`) builds
from `SONGS_DIR`, falling back to a bundled example song when it's unset or empty — the dev server
also watches the directory and reloads when a file there changes.

## Song format

```json
{
  "title": "En enda sak är säker",
  "key": "Dm",
  "capo": 0,
  "tempo": 92,
  "transpose": 0,
  "page": { "format": "A4", "orientation": "portrait", "columns": 1, "fontSize": 13 },
  "sections": [
    { "name": "Intro", "chords": ["Dm", "Gm", "A", "Dm"] },
    {
      "name": "Verse 1",
      "lines": ["En [Dm]enda sak är [Gm]säker", "och [A]det är livets [Dm]gång;", "", "att [Dm]allting vänder [Gm]åter"]
    }
  ]
}
```

| Field                  | Notes                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `title`, `artist`      | Printed in the header on page one                                                                        |
| `key`, `capo`, `tempo` | Optional; shown as compact metadata. With a transpose applied, the key prints as `Dm → Em`               |
| `transpose`            | Semitones. Negative shifts down                                                                          |
| `page.format`          | `A4`, `A5` or `Letter`                                                                                   |
| `page.orientation`     | `portrait` or `landscape`                                                                                |
| `page.columns`         | `1`, `2` or `3`. More columns fit more on a sheet, at a narrower measure — watch for long lines wrapping |
| `page.fontSize`        | Lyric size in px. Chords scale with it                                                                   |
| `sections[].name`      | Free text, printed as `[Verse 1]`                                                                        |
| `sections[].lines`     | Lyrics with `[Chord]` markers. `""` is a blank spacer line                                               |
| `sections[].chords`    | Bare chord sequence, for intros and breaks                                                               |
| `sections[].note`      | Small performance note beside the section name                                                           |

A chord attaches to the text **after** it. Write `[[` for a literal `[`. Every field except
`sections` is optional — the preview re-renders on every keystroke, so half-typed JSON has to
render rather than crash.

## Stack

React 19, TypeScript, Vite 8, in a Turborepo monorepo (see [`docs/`](./docs/) for the full
architecture). Tailwind CSS 4 + HeroUI v3 for the app chrome; the chord sheet itself
(`SongDoc.css`) is deliberately plain CSS rather than Tailwind, since the pagination logic measures
real rendered pixel heights against it. `html2canvas` and `jsPDF` handle PDF export.

## Scripts

- `pnpm dev` — start the development server
- `pnpm build` — build all apps for production
- `pnpm test` — run unit/component tests (Vitest, browser-based)
- `pnpm lint` — run ESLint across all packages
- `pnpm storybook` — start the Storybook development server
- `pnpm deploy` — build and prepare deployment artifacts in `output/deployment/`

## Project structure

```
├── apps/
│   ├── web/            # Main React application (React 19 + Vite 8 + HeroUI v3)
│   └── storybook/      # Storybook configuration and stories
├── packages/
│   ├── ui/             # (@package/ui) Cross-app UI (logos, layouts, icons)
│   ├── react/          # (@package/react) Reusable React 19 hooks
│   └── storybook/      # (@package/storybook) Storybook decorators
├── configs/            # Shared ESLint, Tailwind, TypeScript, Vite configs
│                       #   (configs/vite ships the SONGS_DIR plugins)
├── design/tokens/      # (@design/tokens) Style Dictionary design tokens
├── docs/               # Architectural reference — start here for deeper detail
├── .github/workflows/  # CI/CD pipeline definitions
└── output/             # Build artifacts
```

`apps/web` uses a **four-layer architecture** — `core/` (domain + app shell), `components/`
(reusable UI), `views/` (page compositions), `routes/` (TanStack file-based routes). The song
domain logic (chord parsing, transposition, pagination, file I/O, PDF export) lives in
`apps/web/src/core/song-print/`. For the full picture, see:

- [`docs/architecture.md`](./docs/architecture.md) — layers, provider hierarchy, data flow
- [`docs/structure.md`](./docs/structure.md) — full directory tree with per-folder responsibilities
- [`docs/patterns.md`](./docs/patterns.md) — Controller pattern, route hooks, atom co-location
- [`docs/packages.md`](./docs/packages.md) — workspace package tour

## License

MIT — see [LICENSE](LICENSE).
