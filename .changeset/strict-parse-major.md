---
'js-vtt': major
---

Harden parsing and public API:

- `VTT.fromString` throws `InvalidHeaderError` for bad headers and `InvalidVttError` for unrecognized blocks (no silent drops)
- `VTT.fromSRT` throws `SrtValidationError` for missing timing lines
- `VTT.fromURL` rejects non-OK HTTP responses and rethrows typed parse errors
- `segments` returns a shallow copy; `merge` deep-clones segments
- Cue `valid` rejects non-finite timings; `rescale`/`syncFps` throw on invalid divisors
- Rename `SegementType` → `SegmentType`; remove unused `CalledItWrongError`
- `attachToVideo` copies cue id and settings onto `VTTCue`; `regionId` mirrors `settings.region`
