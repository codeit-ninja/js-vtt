# js-vtt

A TypeScript library for parsing, building, and manipulating [WebVTT](https://www.w3.org/TR/webvtt1/) subtitle files. Supports both VTT and SRT formats.

## Installation

```bash
npm install js-vtt
# or
pnpm add js-vtt
# or
yarn add js-vtt
```

> Requires an ESM environment. The package ships as pure ESM (`"type": "module"`).

---

## Quick start

```ts
import { VTT } from 'js-vtt';

const vtt = new VTT().addCue(0, 3.5, 'Hello, world!').addCue(4, 7, 'This is a subtitle.');

console.log(vtt.toString());
// WEBVTT
//
// 00:00:00.000 --> 00:00:03.500
// Hello, world!
//
// 00:00:04.000 --> 00:00:07.000
// This is a subtitle.
```

---

## Table of contents

- [Parsing](#parsing)
- [Building](#building)
- [Segments](#segments)
    - [Header](#header)
    - [Cue](#cue)
    - [Region](#region)
    - [Style](#style)
    - [Comment](#comment)
- [Querying segments](#querying-segments)
- [Timing utilities](#timing-utilities)
- [Validation](#validation)
- [Serialization](#serialization)
- [Browser utilities](#browser-utilities)
- [Errors](#errors)

---

## Parsing

### From a string

```ts
import { VTT } from 'js-vtt';

const raw = `WEBVTT

00:00:01.000 --> 00:00:04.000
Hello!`;

const vtt = VTT.fromString(raw);
```

### From a URL

Fetches the file at the given URL and parses it. Auto-detects SRT vs VTT.

```ts
const vtt = await VTT.fromURL('https://example.com/subtitles.vtt');
```

### From a File (browser)

Parses a browser [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object. Auto-detects SRT vs VTT.

```ts
const vtt = await VTT.fromFile(file); // file: File
```

### From an SRT string

Converts an SRT-formatted string to a `VTT` instance. Cue sequence numbers are preserved as cue identifiers.

```ts
const srt = `1
00:00:01,000 --> 00:00:04,000
Hello!`;

const vtt = VTT.fromSRT(srt);
```

### From JSON

Reconstructs a `VTT` instance from the output of `vtt.toJSON()`.

```ts
const json = vtt.toJSON();
const restored = VTT.fromJSON(json);
```

### Merging multiple files

Combines two or more `VTT` instances into one. The header of the first instance is used.

```ts
const merged = VTT.merge(vttA, vttB, vttC);
```

---

## Building

All builder methods return `this`, so they can be chained.

```ts
import { VTT } from 'js-vtt';

const vtt = new VTT('My subtitles')
    .addCue(0, 2, 'First line')
    .addCue(3, 6, 'Second line', 'cue-2')
    .addComment('Translated by Jane')
    .addStyle(['::cue'], { color: 'yellow' });
```

### `new VTT(description?, meta?)`

| Parameter     | Type                                | Description                                       |
| ------------- | ----------------------------------- | ------------------------------------------------- |
| `description` | `string` (optional)                 | Text placed on the `WEBVTT` header line           |
| `meta`        | `Record<string, string>` (optional) | Key-value metadata appended below the header line |

```ts
const vtt = new VTT('Example', { Kind: 'captions', Language: 'en' });
// Produces: WEBVTT Example
//           Kind: captions
//           Language: en
```

### `setHeader(description?, meta?)`

Updates the header after construction.

```ts
vtt.setHeader('Updated title', { Language: 'fr' });
```

---

## Segments

### Header

The header is created automatically when you construct a `VTT` instance. Use `setHeader()` to update it, or access it via the `header` getter.

```ts
vtt.header.description; // string | undefined
vtt.header.meta; // Record<string, string>
```

---

### Cue

A cue is a timed block of subtitle text.

#### `addCue(startTime, endTime, text, identifier?, settings?)`

| Parameter    | Type                          | Description                                 |
| ------------ | ----------------------------- | ------------------------------------------- |
| `startTime`  | `number`                      | Start time in **seconds**                   |
| `endTime`    | `number`                      | End time in **seconds**                     |
| `text`       | `string`                      | Subtitle text (may contain VTT markup tags) |
| `identifier` | `string \| number` (optional) | Cue identifier                              |
| `settings`   | `CueSettings` (optional)      | Positioning and layout settings             |

```ts
vtt.addCue(10, 15, '<b>Bold text</b>', 'intro', {
    align: 'center',
    position: '50%',
    size: '80%',
});
```

#### `CueSettings`

```ts
type CueSettings = {
    vertical?: 'rl' | 'lr'; // vertical text direction
    line?: number | string; // vertical position
    position?: string; // horizontal position (e.g. "50%")
    size?: string; // cue box width (e.g. "80%")
    align?: 'start' | 'center' | 'end';
    region?: string; // ID of a REGION block
};
```

#### Working with `Cue` instances directly

```ts
import { Cue } from 'js-vtt';

const cue = new Cue(0, 5, 'Hello');
cue.setStartTime(1).setEndTime(6).setText('Hi there').setIdentifier('c1');

// Remove inline HTML/VTT tags from the text
cue.removeTags();

// Parse from a raw VTT block string
const parsed = Cue.fromString('00:00:01.000 --> 00:00:04.000\nHello!');
```

---

### Region

Regions define named rectangular areas on screen for cue positioning.

#### `addRegion(id?, width?, lines?, regionAnchor?, viewportAnchor?, scroll?)`

| Parameter        | Type                          | Description                                   |
| ---------------- | ----------------------------- | --------------------------------------------- |
| `id`             | `string` (optional)           | Region identifier, referenced by cue settings |
| `width`          | `number` (optional)           | Width as a percentage (e.g. `40` for `40%`)   |
| `lines`          | `number` (optional)           | Number of lines tall                          |
| `regionAnchor`   | `[number, number]` (optional) | `[x%, y%]` anchor point within the region     |
| `viewportAnchor` | `[number, number]` (optional) | `[x%, y%]` anchor point within the viewport   |
| `scroll`         | `'up'` (optional)             | Scroll direction                              |

```ts
vtt.addRegion('bottom', 40, 3, [0, 100], [10, 90], 'up');
```

#### Working with `Region` instances directly

```ts
import { Region } from 'js-vtt';

const region = new Region();
region
    .setId('top')
    .setWidth(80)
    .setLines(2)
    .setRegionAnchor([50, 100])
    .setViewportAnchor([50, 90])
    .setScroll('up');
```

---

### Style

Style blocks embed CSS that targets cue elements.

#### `addStyle(selectors, declarations)`

| Parameter      | Type                                                 | Description                                                                                                |
| -------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `selectors`    | `string[]`                                           | CSS selectors (e.g. `['::cue']`)                                                                           |
| `declarations` | `Partial<Pick<CSSStyleDeclaration, CueCSSProperty>>` | Only [WebVTT-supported CSS properties](https://www.w3.org/TR/webvtt1/#the-cue-pseudo-element) are accepted |

```ts
vtt.addStyle(['::cue'], { color: 'white', backgroundColor: 'rgba(0,0,0,0.8)' });
vtt.addStyle(['::cue(b)'], { fontWeight: 'bold', color: 'yellow' });
```

Supported CSS properties include: `color`, `opacity`, `visibility`, `background`, `backgroundColor`, `font`, `fontSize`, `fontFamily`, `fontWeight`, `fontStyle`, `fontVariant`, `fontStretch`, `textDecoration`, `textShadow`, `outline`, `lineHeight`, `whiteSpace`, `textCombineUpright`, `rubyPosition`, and their sub-properties.

#### Working with `Style` instances directly

```ts
import { Style } from 'js-vtt';

const style = new Style([{ selectors: ['::cue'], declarations: { color: 'white' } }]);
style.addRule({ selectors: ['::cue(b)'], declarations: { fontWeight: 'bold' } });
style.removeRule(0); // remove rule at index 0
```

---

### Comment

Comment blocks (`NOTE`) are included in VTT output but stripped when serializing to SRT.

#### `addComment(text)`

```ts
vtt.addComment('This file was generated by js-vtt');
```

#### Working with `Comment` instances directly

```ts
import { Comment } from 'js-vtt';

const comment = new Comment('Translator notes go here');
comment.setText('Updated notes');
```

---

### `addSegment(segment)`

Adds any `Segment` subclass instance directly, for cases where you construct segments manually.

```ts
import { Cue, Region } from 'js-vtt';

vtt.addSegment(new Cue(0, 1, 'Hi')).addSegment(new Region('r1'));
```

---

## Querying segments

### `getCues()`

Returns all `Cue` segments.

```ts
const cues = vtt.getCues(); // Cue[]
```

### `getCuesByTime(start, end)`

Returns all cues whose time range overlaps `[start, end]` (in seconds). Useful for rendering cues at a given playback position.

```ts
const visible = vtt.getCuesByTime(5, 10); // cues active between 5s and 10s
```

### `getCueById(id)`

Returns the first cue matching the given identifier, or `undefined`.

```ts
const cue = vtt.getCueById('intro');
```

### `getSegmentsByType(type)`

Returns all segments of a given type. Accepts either a class constructor or a segment type string.

```ts
import { Cue, Region } from 'js-vtt';

vtt.getSegmentsByType(Cue); // Cue[]
vtt.getSegmentsByType(Region); // Region[]
vtt.getSegmentsByType('style'); // Style[]
```

### `segments`

The full list of all segments including the header (index 0).

```ts
vtt.segments; // Segment[]
```

---

## Timing utilities

All timing methods return `this` for chaining.

### `shiftTime(offset)`

Shifts all cue timings by `offset` seconds. Use a positive value to delay, negative to advance.

```ts
vtt.shiftTime(5); // delay all cues by 5 seconds
vtt.shiftTime(-2); // advance all cues by 2 seconds
```

### `rescale(originalDuration, newDuration)`

Scales all cue timings proportionally when the video length has changed.

```ts
// Video was 120 s, now re-encoded to 118 s
vtt.rescale(120, 118);
```

### `syncFps(sourceFps, targetFps)`

Remaps cue timings when the video frame rate has changed. Every timestamp is multiplied by `sourceFps / targetFps`.

```ts
// Subtitles were authored for 59.94 fps video, target is 29.97 fps
vtt.syncFps(59.94, 29.97);
```

---

## Validation

### `validate()`

Returns `true` if the header and all segments are structurally valid per the WebVTT spec.

```ts
if (!vtt.validate()) {
    console.error('VTT file has invalid segments');
}
```

### `getValidationErrors()`

Returns an array of `{ index, segment }` objects for every invalid segment. An empty array means the file is valid. More useful than `validate()` when you need to know _what_ is wrong.

```ts
const errors = vtt.getValidationErrors();
// [{ index: 2, segment: Cue { ... } }, ...]

for (const { index, segment } of errors) {
    console.error(`Segment at index ${index} is invalid:`, segment.toJSON());
}
```

### `valid` getter (per segment)

Every segment exposes a `valid` getter that returns `true` if the segment is structurally valid.

```ts
const cue = new Cue(5, 3, 'Bad'); // endTime < startTime
cue.valid; // false
```

`isValid()` is also available as a backwards-compatible alias for `valid`.

---

## Serialization

### `toString(format?)`

Serializes the VTT instance to a string.

| `format` | Output                      |
| -------- | --------------------------- |
| `'vtt'`  | WebVTT format **(default)** |
| `'srt'`  | SubRip (SRT) format         |

```ts
// WebVTT
const vttString = vtt.toString();
const vttString2 = vtt.toString('vtt');

// SRT (NOTE and STYLE blocks are omitted; inline tags stripped from cue text)
const srtString = vtt.toString('srt');
```

### `toJSON()`

Returns a plain object representing the full VTT file. Each segment includes a `_type` discriminant field (`'cue'`, `'region'`, `'style'`, `'comment'`, `'header'`).

```ts
const json = vtt.toJSON();
// {
//   header: { _type: 'header', description: '...', meta: { ... } },
//   segments: [
//     { _type: 'cue', startTime: 0, endTime: 5, text: '...', ... },
//     ...
//   ]
// }
```

Individual segments also have `toString()` and `toJSON()` methods.

---

## Browser utilities

### `attachToVideo(video, kind, label?, language?)`

Creates a [`TextTrack`](https://developer.mozilla.org/en-US/docs/Web/API/TextTrack) on the given `HTMLVideoElement` and populates it with `VTTCue` objects from all cues in the instance.

```ts
const track = vtt.attachToVideo(videoEl, 'subtitles', 'English', 'en');
track.mode = 'showing';
```

| Parameter  | Type                | Description                                        |
| ---------- | ------------------- | -------------------------------------------------- |
| `video`    | `HTMLVideoElement`  | The video element to attach the track to           |
| `kind`     | `TextTrackKind`     | e.g. `'subtitles'`, `'captions'`, `'descriptions'` |
| `label`    | `string` (optional) | Human-readable track label                         |
| `language` | `string` (optional) | BCP 47 language tag (e.g. `'en'`, `'fr'`)          |

---

## Errors

All errors extend the native `Error` class and include the offending segment string in the message for easy debugging.

| Class                 | Thrown when                                                     |
| --------------------- | --------------------------------------------------------------- |
| `InvalidHeaderError`  | `VTT.fromString()` receives a missing/malformed `WEBVTT` header |
| `InvalidCueError`     | `Cue.fromString()` receives a malformed cue block               |
| `InvalidRegionError`  | `Region.fromString()` receives a malformed region block         |
| `InvalidStyleError`   | `Style.fromString()` receives a malformed style block           |
| `InvalidCommentError` | `Comment.fromString()` receives a malformed NOTE block          |
| `InvalidVttError`     | General VTT-level validation failure (parsing or structure)     |
| `SrtValidationError`  | SRT-specific validation failure                                 |

```ts
import { VTT, InvalidVttError } from 'js-vtt';

try {
    VTT.fromString('not a vtt file');
} catch (e) {
    if (e instanceof InvalidVttError) {
        console.error('Bad VTT:', e.message);
    }
}
```

---

## License

MIT
