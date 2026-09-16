# js-vtt

## 3.0.0

### Major Changes

- 191a40b: Harden parsing and public API:
    - `VTT.fromString` throws `InvalidHeaderError` for bad headers and `InvalidVttError` for unrecognized blocks (no silent drops)
    - `VTT.fromSRT` throws `SrtValidationError` for missing timing lines
    - `VTT.fromURL` rejects non-OK HTTP responses and rethrows typed parse errors
    - `segments` returns a shallow copy; `merge` deep-clones segments
    - Cue `valid` rejects non-finite timings; `rescale`/`syncFps` throw on invalid divisors
    - Rename `SegementType` → `SegmentType`; remove unused `CalledItWrongError`
    - `attachToVideo` copies cue id and settings onto `VTTCue`; `regionId` mirrors `settings.region`

### Patch Changes

- 191a40b: Allow cues with an empty text payload (timing-only cues no longer throw `InvalidCueError`)

## 2.2.1

### Patch Changes

- 58a42ee: Add license and link repo in package

## 2.2.0

### Minor Changes

- 1f2afdd: Add new features

### Patch Changes

- 19d64c7: Disable eslint in main.ts

## 2.2.0

### Minor Changes

- **`VTT.fromFile(file)`** — parse a browser `File` object directly; auto-detects SRT vs VTT
- **`VTT.fromSRT(srt)`** — parse an SRT string directly; cue sequence numbers are preserved as identifiers
- **`VTT.merge(...vtts)`** — combine two or more `VTT` instances into one, using the first instance's header
- **`getValidationErrors()`** — returns `{ index, segment }[]` for every invalid segment instead of a plain boolean
- **`getCuesByTime(start, end)`** — returns all cues whose time range overlaps the given window
- **`getCueById(id)`** — look up a cue by its identifier
- **`getSegmentsByType(type)`** — filter segments by class constructor or type string (`'cue'`, `'region'`, etc.)
- **`attachToVideo(video, kind, label?, language?)`** — create and populate a `TextTrack` on an `HTMLVideoElement`
- **`valid` getter** — every segment now exposes a `valid` boolean getter; `isValid()` is kept as a backwards-compatible alias
- **`_type` field in `toJSON()`** — all segment JSON representations now include a `_type` discriminant (`'cue'`, `'region'`, `'style'`, `'comment'`, `'header'`)

### Patch Changes

- Fixed `fromSRT()` incorrectly including cue sequence numbers in the subtitle text
- Fixed `fromSRT()` emitting raw seconds instead of `HH:MM:SS.mmm` timestamps

## 2.1.1

### Patch Changes

- 5e3550c: add getters for segments and header
- 0df93e0: Add getCues method to return all cues

## 2.1.0

### Minor Changes

- 2234167: Move tests and export errors and helpers from package

### Patch Changes

- 25dc5f4: Update readme
- d8b79cd: Remove badge from readme
- 28747c9: Update error thrown by invalid header

## 2.0.0

### Major Changes

- 70f646f: v1
