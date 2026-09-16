# AGENTS.md — js-vtt

Guidance for AI agents working in this repository.

## Project

**js-vtt** is a TypeScript library for parsing, building, and manipulating [WebVTT](https://www.w3.org/TR/webvtt1/) subtitle files. It also supports SRT import/export. The package is **ESM-only**.

| Area | Choice |
|------|--------|
| Language | TypeScript (strict) |
| Package manager | pnpm |
| Bundler | tsdown → `dist/` (`.mjs` + `.d.mts`) |
| Tests | Vitest + coverage |
| Lint / format | ESLint (typescript-eslint) + Prettier |
| Docs | VitePress under `docs/` |
| Releases | Changesets |

## Repository map

```
src/
  index.ts          Public entry (re-exports)
  vtt.ts            Core VTT class
  helpers.ts        Format / segment detectors
  main.ts           Local scratch only (not published)
  segments/         Segment hierarchy
  errors/           Domain error classes
tests/              Vitest tests (mirrors src/)
docs/               VitePress site
.changeset/         Release notes / version bumps
```

## Core design

- **`VTT`** owns an ordered list of segments; the first is always a **`Header`**.
- Segments extend abstract **`Segment`**: `Header`, `Cue`, `Region`, `Style`, `Comment`.
- Public mutators are **fluent** (`return this`).
- Encapsulation uses **`#private`** fields with public getters / setters.
- Serialization: `toString('vtt' | 'srt')`, `toJSON()`, plus static `fromString` / `fromSRT` / `fromURL` / `fromFile` / `fromJSON` / `merge` on `VTT`.
- Validation failures throw typed errors under `src/errors/`.

## Coding rules

1. Relative imports use **`.js` extensions** (ESM resolution), e.g. `import { Cue } from './cue.js'`.
2. Do not add CommonJS or dual-package patterns.
3. New segments: extend `Segment`, implement `toString` / `toJSON` / `valid` / `fromString`, set `_type`, re-export from segment + root index if public.
4. New errors: default-export class under `src/errors/`, re-export from `errors/index.ts`.
5. Match Prettier: 4 spaces, single quotes, semicolons, trailing commas, width 80.
6. Keep the published API stable; pair breaking or user-visible changes with a **changeset** and docs updates.

## Testing

- Place tests under `tests/` mirroring `src/` (e.g. `tests/segments/cue.test.ts`).
- Import source modules from `src/`, never from `dist/`.
- Cover fluent chaining, serialization round-trips, validation, and VTT vs SRT where relevant.
- Verify with `pnpm test` and `pnpm lint`.

## Common workflows

```bash
pnpm install
pnpm test
pnpm lint
pnpm build
pnpm docs:dev
pnpm changeset   # before releasing user-visible changes
```

## Docs to keep in sync

When changing public behavior, update as needed:

- `readme.md` — primary API reference
- `docs/` — VitePress guides
- `llms.txt` — condensed agent-oriented overview
- `.changeset/` — release note entry

## Out of scope / caution

- Do not treat `src/main.ts` as production API.
- Do not commit `dist/`, `coverage/`, or `node_modules/`.
- Do not bump versions by hand; use changesets.
- Prefer WebVTT-spec-aligned behavior; document intentional deviations.

## Cursor rules

Persistent agent rules live in `.cursor/rules/`. Prefer those files for session-specific detail; this `AGENTS.md` is the repo-level overview.
