# js-vtt

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
