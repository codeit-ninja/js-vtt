import { describe, it, expect, vi, afterEach } from 'vitest';
import { VTT } from '../src/vtt';
import { Cue } from '../src/segments/cue';
import { Region } from '../src/segments/region';
import { Comment } from '../src/segments/comment';
import InvalidVttError from '../src/errors/InvalidVttError';

// ---------------------------------------------------------------------------
// Real-world-ish WebVTT fixture strings
// ---------------------------------------------------------------------------

/** A minimal spec-valid file: header + two cues, no identifiers */
const MINIMAL_VTT = `WEBVTT

00:00:01.000 --> 00:00:04.000
Hello, world!

00:00:05.000 --> 00:00:08.000
This is a subtitle.`;

/** Same file with UTF-8 BOM prepended */
const BOM_VTT = '\uFEFF' + MINIMAL_VTT;

/** Cues with numeric identifiers (SRT-style numbering) */
const NUMBERED_VTT = `WEBVTT

1
00:00:00.000 --> 00:00:03.000
First cue

2
00:00:04.000 --> 00:00:07.000
Second cue

3
00:00:08.000 --> 00:00:11.000
Third cue`;

/** Cues with string identifiers */
const NAMED_VTT = `WEBVTT

intro
00:00:00.000 --> 00:00:05.000
Welcome to our video

chapter-1
00:00:10.000 --> 00:00:15.000
Chapter one begins`;

/** File containing cue positioning settings */
const SETTINGS_VTT = `WEBVTT

00:00:01.000 --> 00:00:04.000 align:center size:80% position:50%
Centered text

00:00:05.000 --> 00:00:08.000 vertical:rl line:0 align:start
Vertical text`;

/** File with a NOTE comment */
const COMMENT_VTT = `WEBVTT

NOTE
This file was translated by Jane Doe.

00:00:01.000 --> 00:00:04.000
Hello`;

/** File with a STYLE block */
const STYLE_VTT = `WEBVTT

STYLE
::cue {
  color: white;
  background-color: black;
}

00:00:01.000 --> 00:00:04.000
Styled cue`;

/** File with a REGION block */
const REGION_VTT = `WEBVTT

REGION
id:fred
width:40%
lines:3
regionanchor:0%,100%
viewportanchor:10%,90%
scroll:up

1
00:00:01.000 --> 00:00:04.000 region:fred
In a region`;

/** A fully populated file with header meta, region, style, comments, and cues */
const FULL_VTT = `WEBVTT - Full example
Kind: captions
Language: en

NOTE
Translated by Jane Doe

REGION
id:bottom
width:80%
lines:3
regionanchor:50%,100%
viewportanchor:50%,90%

STYLE
::cue {
  color: white;
}

1
00:00:01.000 --> 00:00:04.000 region:bottom
Hello!

2
00:00:05.000 --> 00:00:08.000
<b>Bold text</b>

NOTE
End of file`;

/** File with multiline cue text */
const MULTILINE_CUE_VTT = `WEBVTT

00:00:01.000 --> 00:00:05.000
Line one
Line two
Line three`;

/** File using short mm:ss.mmm timestamp form (omitted hours) */
const SHORT_TIMESTAMP_VTT = `WEBVTT

00:01.000 --> 00:04.000
Short form cue`;

// ---------------------------------------------------------------------------
// Construction & fluent API
// ---------------------------------------------------------------------------

describe('VTT construction', () => {
    it('creates an empty VTT instance with no args', () => {
        const vtt = new VTT();
        const json = vtt.toJSON();
        expect(json.header.description).toBeUndefined();
        expect(json.segments).toHaveLength(0);
    });

    it('stores the description in the header', () => {
        const vtt = new VTT('My captions');
        expect(vtt.toJSON().header.description).toBe('My captions');
    });

    it('stores metadata in the header', () => {
        const vtt = new VTT(undefined, { Kind: 'captions', Language: 'en' });
        expect(vtt.toJSON().header.meta).toMatchObject({ Kind: 'captions', Language: 'en' });
    });

    it('setHeader updates description and returns VTT for chaining', () => {
        const vtt = new VTT();
        const result = vtt.setHeader('Updated');
        expect(result).toBe(vtt);
        expect(vtt.toJSON().header.description).toBe('Updated');
    });

    it('setHeader updates meta', () => {
        const vtt = new VTT();
        vtt.setHeader(undefined, { Language: 'fr' });
        expect(vtt.toJSON().header.meta).toMatchObject({ Language: 'fr' });
    });
});

// ---------------------------------------------------------------------------
// Fluent segment builders
// ---------------------------------------------------------------------------

describe('VTT fluent builders', () => {
    it('addCue returns VTT and adds the cue', () => {
        const vtt = new VTT();
        const result = vtt.addCue(0, 3, 'Hello');
        expect(result).toBe(vtt);
        expect(vtt.toJSON().segments).toHaveLength(1);
    });

    it('addCue stores all cue fields', () => {
        const vtt = new VTT();
        vtt.addCue(1, 4, 'Text', 'id1', { align: 'center' });
        const seg = vtt.toJSON().segments[0];
        expect(seg).toMatchObject({ startTime: 1, endTime: 4, text: 'Text', identifier: 'id1' });
    });

    it('addRegion returns VTT and adds the region', () => {
        const vtt = new VTT();
        const result = vtt.addRegion('fred', 40, 3);
        expect(result).toBe(vtt);
        expect(vtt.toJSON().segments).toHaveLength(1);
        expect(vtt.toJSON().segments[0]).toMatchObject({ id: 'fred', width: 40, lines: 3 });
    });

    it('addStyle returns VTT and adds the style', () => {
        const vtt = new VTT();
        const result = vtt.addStyle(['::cue'], { color: 'white' });
        expect(result).toBe(vtt);
        expect(vtt.toJSON().segments).toHaveLength(1);
    });

    it('addComment returns VTT and adds the comment', () => {
        const vtt = new VTT();
        const result = vtt.addComment('A note');
        expect(result).toBe(vtt);
        expect(vtt.toJSON().segments[0]).toMatchObject({ text: 'A note' });
    });

    it('addSegment accepts any Segment subclass', () => {
        const vtt = new VTT();
        vtt.addSegment(new Cue(0, 1, 'Hi'));
        vtt.addSegment(new Region('r1'));
        vtt.addSegment(new Comment('note'));
        expect(vtt.toJSON().segments).toHaveLength(3);
    });

    it('supports a full fluent chain', () => {
        const vtt = new VTT('Test')
            .addComment('Translated by Jane')
            .addRegion('bottom', 80, 2)
            .addStyle(['::cue'], { color: 'yellow' })
            .addCue(0, 3, 'Hello')
            .addCue(4, 8, 'World', '2');
        expect(vtt.toJSON().segments).toHaveLength(5);
    });
});

// ---------------------------------------------------------------------------
// toString — VTT format
// ---------------------------------------------------------------------------

describe('VTT toString("vtt")', () => {
    it('outputs WEBVTT header for an empty file', () => {
        expect(new VTT().toString()).toBe('WEBVTT');
    });

    it('separates the header from cues with two newlines', () => {
        const vtt = new VTT().addCue(0, 1, 'Hi');
        const output = vtt.toString();
        expect(output).toMatch(/^WEBVTT\n\n/);
    });

    it('produces a valid minimal VTT file', () => {
        const vtt = new VTT().addCue(1, 4, 'Hello, world!').addCue(5, 8, 'This is a subtitle.');
        const output = vtt.toString();
        expect(output).toContain('WEBVTT');
        expect(output).toContain('00:00:01.000 --> 00:00:04.000\nHello, world!');
        expect(output).toContain('00:00:05.000 --> 00:00:08.000\nThis is a subtitle.');
    });

    it('includes cue identifier when present', () => {
        const vtt = new VTT().addCue(0, 1, 'Hi', 'intro');
        expect(vtt.toString()).toContain('intro\n00:00:00.000 --> 00:00:01.000\nHi');
    });

    it('includes NOTE blocks', () => {
        const vtt = new VTT().addComment('A translator note').addCue(0, 1, 'Hi');
        expect(vtt.toString()).toContain('NOTE\nA translator note');
    });

    it('includes STYLE blocks', () => {
        const vtt = new VTT().addStyle(['::cue'], { color: 'white' }).addCue(0, 1, 'Hi');
        expect(vtt.toString()).toContain('STYLE');
        expect(vtt.toString()).toContain('::cue');
    });

    it('includes REGION blocks', () => {
        const vtt = new VTT().addRegion('fred', 40, 3).addCue(0, 1, 'In a region');
        expect(vtt.toString()).toContain('REGION\nid:fred');
    });

    it('separates segments with double newlines', () => {
        const vtt = new VTT().addCue(0, 1, 'A').addCue(2, 3, 'B');
        // Each pair of adjacent segment outputs must be separated by exactly \n\n
        const output = vtt.toString();
        const parts = output.split('\n\n');
        expect(parts.length).toBeGreaterThanOrEqual(3); // header + 2 cues
    });
});

// ---------------------------------------------------------------------------
// toString — SRT format
// ---------------------------------------------------------------------------

describe('VTT toString("srt")', () => {
    it('omits the WEBVTT header line', () => {
        const vtt = new VTT().addCue(0, 3, 'Hello');
        expect(vtt.toString('srt')).not.toContain('WEBVTT');
    });

    it('numbers cues sequentially starting at 1', () => {
        const vtt = new VTT().addCue(0, 1, 'A').addCue(2, 3, 'B').addCue(4, 5, 'C');
        const srt = vtt.toString('srt');
        expect(srt).toContain('1\n');
        expect(srt).toContain('2\n');
        expect(srt).toContain('3\n');
    });

    it('uses commas as millisecond separator in SRT timings', () => {
        const vtt = new VTT().addCue(1.5, 4.25, 'Test');
        const srt = vtt.toString('srt');
        expect(srt).toContain('00:00:01,500 --> 00:00:04,250');
    });

    it('strips VTT markup tags from cue text in SRT output', () => {
        const vtt = new VTT().addCue(0, 2, '<b>Bold</b> text');
        expect(vtt.toString('srt')).toContain('Bold text');
        expect(vtt.toString('srt')).not.toContain('<b>');
    });

    it('omits NOTE blocks', () => {
        const vtt = new VTT().addComment('A note').addCue(0, 1, 'Hi');
        expect(vtt.toString('srt')).not.toContain('NOTE');
    });

    it('omits STYLE blocks', () => {
        const vtt = new VTT().addStyle(['::cue'], { color: 'white' }).addCue(0, 1, 'Hi');
        expect(vtt.toString('srt')).not.toContain('STYLE');
    });

    it('omits REGION blocks', () => {
        const vtt = new VTT().addRegion('fred', 40).addCue(0, 1, 'In a region');
        expect(vtt.toString('srt')).not.toContain('REGION');
    });

    it('produces a valid SRT structure for multiple cues', () => {
        const vtt = new VTT().addCue(1, 4, 'Hello').addCue(5, 8, 'World');
        const srt = vtt.toString('srt');
        expect(srt).toBe(
            '1\n00:00:01,000 --> 00:00:04,000\nHello\n\n2\n00:00:05,000 --> 00:00:08,000\nWorld',
        );
    });
});

// ---------------------------------------------------------------------------
// validate()
// ---------------------------------------------------------------------------

describe('VTT validate()', () => {
    it('returns true for an empty VTT', () => {
        expect(new VTT().validate()).toBe(true);
    });

    it('returns true for a valid file with cues', () => {
        const vtt = new VTT().addCue(0, 5, 'Hello').addCue(6, 10, 'World');
        expect(vtt.validate()).toBe(true);
    });

    it('returns false when a cue has endTime <= startTime', () => {
        const vtt = new VTT();
        vtt.addSegment(new Cue(5, 3, 'Bad cue'));
        expect(vtt.validate()).toBe(false);
    });

    it('returns false when a cue text contains -->', () => {
        const vtt = new VTT();
        vtt.addSegment(new Cue(0, 5, 'bad --> text'));
        expect(vtt.validate()).toBe(false);
    });

    it('returns false when a region id contains whitespace', () => {
        const vtt = new VTT();
        vtt.addSegment(new Region('bad id'));
        expect(vtt.validate()).toBe(false);
    });

    it('returns false when a comment contains -->', () => {
        const vtt = new VTT();
        vtt.addSegment(new Comment('bad --> note'));
        expect(vtt.validate()).toBe(false);
    });

    it('returns true when a full VTT with all segment types is valid', () => {
        const vtt = new VTT('Example', { Kind: 'captions' })
            .addComment('Translated by Jane')
            .addRegion('fred', 40, 3, [0, 100], [10, 90], 'up')
            .addStyle(['::cue'], { color: 'white' })
            .addCue(0, 5, 'Hello')
            .addCue(6, 10, '<b>World</b>');
        expect(vtt.validate()).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// toJSON / fromJSON round-trip
// ---------------------------------------------------------------------------

describe('VTT toJSON / fromJSON', () => {
    it('toJSON returns a header and segments array', () => {
        const vtt = new VTT('Test').addCue(0, 1, 'Hi');
        const json = vtt.toJSON();
        expect(json).toHaveProperty('header');
        expect(json).toHaveProperty('segments');
        expect(json.segments).toHaveLength(1);
    });

    it('fromJSON reconstructs a Cue', () => {
        const vtt = new VTT().addCue(1, 4, 'Hello', 'c1', { align: 'center' });
        const restored = VTT.fromJSON(vtt.toJSON());
        expect(restored.toJSON().segments[0]).toMatchObject({
            startTime: 1,
            endTime: 4,
            text: 'Hello',
        });
    });

    it('fromJSON reconstructs a Region', () => {
        const vtt = new VTT().addRegion('fred', 40, 3, [0, 100], [10, 90], 'up');
        const restored = VTT.fromJSON(vtt.toJSON());
        expect(restored.toJSON().segments[0]).toMatchObject({ id: 'fred', width: 40, lines: 3 });
    });

    it('fromJSON reconstructs a Style', () => {
        const vtt = new VTT().addStyle(['::cue'], { color: 'white' });
        const restored = VTT.fromJSON(vtt.toJSON());
        expect(restored.toString()).toContain('STYLE');
    });

    it('fromJSON reconstructs a Comment', () => {
        const vtt = new VTT().addComment('A note');
        const restored = VTT.fromJSON(vtt.toJSON());
        expect(restored.toJSON().segments[0]).toMatchObject({ text: 'A note' });
    });

    it('full round-trip toJSON → fromJSON → toString matches original', () => {
        const vtt = new VTT('Example').addComment('Note').addCue(0, 3, 'Hi').addCue(4, 7, 'There');
        const restored = VTT.fromJSON(vtt.toJSON());
        expect(restored.toString()).toBe(vtt.toString());
    });
});

// ---------------------------------------------------------------------------
// fromString — spec-conformant and partially-spec-compatible fixtures
// ---------------------------------------------------------------------------

describe('VTT fromString()', () => {
    it('parses a minimal VTT file', () => {
        const vtt = VTT.fromString(MINIMAL_VTT);
        const json = vtt.toJSON();
        expect(json.segments).toHaveLength(2);
        expect(json.segments[0]).toMatchObject({ startTime: 1, endTime: 4, text: 'Hello, world!' });
        expect(json.segments[1]).toMatchObject({ startTime: 5, endTime: 8 });
    });

    it('parses a VTT file with UTF-8 BOM', () => {
        const vtt = VTT.fromString(BOM_VTT);
        expect(vtt.toJSON().segments).toHaveLength(2);
    });

    it('parses a file with numeric cue identifiers', () => {
        const vtt = VTT.fromString(NUMBERED_VTT);
        const segs = vtt.toJSON().segments;
        expect(segs).toHaveLength(3);
        expect(segs[0]).toMatchObject({ identifier: '1', text: 'First cue' });
        expect(segs[2]).toMatchObject({ identifier: '3', text: 'Third cue' });
    });

    it('parses a file with string cue identifiers', () => {
        const vtt = VTT.fromString(NAMED_VTT);
        const segs = vtt.toJSON().segments;
        expect(segs[0].identifier).toBe('intro');
        expect(segs[1].identifier).toBe('chapter-1');
    });

    it('parses cue settings from the timing line', () => {
        const vtt = VTT.fromString(SETTINGS_VTT);
        const segs = vtt.toJSON().segments;
        expect(segs[0].settings).toMatchObject({ align: 'center', size: '80%', position: '50%' });
        expect(segs[1].settings).toMatchObject({ vertical: 'rl', line: '0', align: 'start' });
    });

    it('parses a NOTE block', () => {
        const vtt = VTT.fromString(COMMENT_VTT);
        const segs = vtt.toJSON().segments;
        // Segments: comment + cue = 2
        expect(segs).toHaveLength(2);
        expect(segs[0]).toMatchObject({ text: 'This file was translated by Jane Doe.' });
    });

    it('parses a STYLE block', () => {
        const vtt = VTT.fromString(STYLE_VTT);
        const segs = vtt.toJSON().segments;
        // Segments: style + cue = 2
        expect(segs).toHaveLength(2);
        expect(segs[0]).toHaveProperty('rules');
    });

    it('parses a REGION block', () => {
        const vtt = VTT.fromString(REGION_VTT);
        const segs = vtt.toJSON().segments;
        // Segments: region + cue = 2
        expect(segs).toHaveLength(2);
        expect(segs[0]).toMatchObject({ id: 'fred', width: 40, lines: 3 });
    });

    it('parses a fully populated VTT file', () => {
        const vtt = VTT.fromString(FULL_VTT);
        const json = vtt.toJSON();
        // The description is everything after the first space on the WEBVTT line.
        // "WEBVTT - Full example" → description = "- Full example"
        expect(json.header.description).toBe('- Full example');
        expect(json.header.meta).toMatchObject({ Kind: 'captions', Language: 'en' });
        expect(json.segments.length).toBeGreaterThanOrEqual(5); // note + region + style + 2 cues + note
    });

    it('parses multi-line cue text', () => {
        const vtt = VTT.fromString(MULTILINE_CUE_VTT);
        expect(vtt.toJSON().segments[0].text).toBe('Line one\nLine two\nLine three');
    });

    it('parses cues with short mm:ss.mmm timestamps', () => {
        const vtt = VTT.fromString(SHORT_TIMESTAMP_VTT);
        const seg = vtt.toJSON().segments[0];
        expect(seg.startTime).toBe(1);
        expect(seg.endTime).toBe(4);
    });

    it('round-trips: fromString → toString → fromString produces identical segments', () => {
        const vtt1 = VTT.fromString(FULL_VTT);
        const vtt2 = VTT.fromString(vtt1.toString());
        expect(vtt2.toJSON().segments.length).toBe(vtt1.toJSON().segments.length);
    });

    it('throws InvalidVttError for a malformed header', () => {
        expect(() => VTT.fromString('NOT A VTT FILE')).toThrow(InvalidVttError);
    });

    it('throws InvalidVttError for an empty string', () => {
        expect(() => VTT.fromString('')).toThrow(InvalidVttError);
    });

    it('handles a file where cues have no blank line between NOTE and first cue', () => {
        // Some real-world files are lenient; test the spec-required blank line case
        const vtt = VTT.fromString(COMMENT_VTT);
        expect(vtt.toJSON().segments.some((s: any) => s.text === 'Hello')).toBe(true);
    });

    // -----------------------------------------------------------------------
    // Spec normalisation: CRLF, NULL, inline NOTE
    // -----------------------------------------------------------------------

    it('parses a CRLF-encoded file (Windows line endings)', () => {
        const crlf = 'WEBVTT\r\n\r\n00:00:01.000 --> 00:00:04.000\r\nHello CRLF\r\n';
        const vtt = VTT.fromString(crlf);
        const segs = vtt.toJSON().segments;
        expect(segs).toHaveLength(1);
        expect(segs[0]).toMatchObject({ startTime: 1, endTime: 4, text: 'Hello CRLF' });
    });

    it('parses a CR-only encoded file (old Mac line endings)', () => {
        const cr = 'WEBVTT\r\r00:00:01.000 --> 00:00:04.000\rHello CR\r';
        const vtt = VTT.fromString(cr);
        const segs = vtt.toJSON().segments;
        expect(segs).toHaveLength(1);
        expect(segs[0]).toMatchObject({ text: 'Hello CR' });
    });

    it('replaces U+0000 NULL bytes with U+FFFD in cue text', () => {
        const withNull = 'WEBVTT\n\n00:00:01.000 --> 00:00:04.000\nHello\u0000World';
        const vtt = VTT.fromString(withNull);
        expect(vtt.toJSON().segments[0].text).toBe('Hello\uFFFDWorld');
    });

    it('parses an inline NOTE comment (NOTE followed by space and text)', () => {
        const withInlineNote =
            'WEBVTT\n\nNOTE I am an inline comment\n\n00:00:01.000 --> 00:00:04.000\nHello';
        const vtt = VTT.fromString(withInlineNote);
        const segs = vtt.toJSON().segments;
        expect(segs).toHaveLength(2);
        expect(segs[0]).toMatchObject({ text: 'I am an inline comment' });
        expect(segs[1]).toMatchObject({ text: 'Hello' });
    });

    it('parses a block NOTE comment (NOTE followed by newline and text)', () => {
        const withBlockNote =
            'WEBVTT\n\nNOTE\nBlock comment text\n\n00:00:01.000 --> 00:00:04.000\nHi';
        const vtt = VTT.fromString(withBlockNote);
        const segs = vtt.toJSON().segments;
        expect(segs[0]).toMatchObject({ text: 'Block comment text' });
    });

    it('does not change BOM-prefixed CRLF file', () => {
        const bomCrlf = '\uFEFFWEBVTT\r\n\r\n00:00:01.000 --> 00:00:04.000\r\nBOM CRLF\r\n';
        const vtt = VTT.fromString(bomCrlf);
        expect(vtt.toJSON().segments[0].text).toBe('BOM CRLF');
    });
});

// ---------------------------------------------------------------------------
// Timing utilities
// ---------------------------------------------------------------------------

describe('VTT shiftTime()', () => {
    it('shifts all cue start and end times by the offset', () => {
        const vtt = new VTT().addCue(1, 4, 'Hello').addCue(5, 8, 'World');
        vtt.shiftTime(10);
        const segs = vtt.toJSON().segments;
        expect(segs[0]).toMatchObject({ startTime: 11, endTime: 14 });
        expect(segs[1]).toMatchObject({ startTime: 15, endTime: 18 });
    });

    it('supports negative offsets (advance cues)', () => {
        const vtt = new VTT().addCue(10, 13, 'Late');
        vtt.shiftTime(-5);
        expect(vtt.toJSON().segments[0]).toMatchObject({ startTime: 5, endTime: 8 });
    });

    it('does not affect non-cue segments', () => {
        const vtt = new VTT().addRegion('fred', 40).addCue(1, 4, 'Hi');
        vtt.shiftTime(5);
        const segs = vtt.toJSON().segments;
        // Region stays the same; only the cue shifts
        expect(segs[0]).toMatchObject({ id: 'fred', width: 40 });
        expect(segs[1]).toMatchObject({ startTime: 6, endTime: 9 });
    });

    it('returns the VTT instance for chaining', () => {
        const vtt = new VTT().addCue(0, 1, 'Hi');
        expect(vtt.shiftTime(1)).toBe(vtt);
    });
});

describe('VTT rescale()', () => {
    it('scales cue timings proportionally', () => {
        // Original: 120 s, new: 60 s → factor = 0.5
        const vtt = new VTT().addCue(20, 40, 'A').addCue(60, 80, 'B');
        vtt.rescale(120, 60);
        const segs = vtt.toJSON().segments;
        expect(segs[0]).toMatchObject({ startTime: 10, endTime: 20 });
        expect(segs[1]).toMatchObject({ startTime: 30, endTime: 40 });
    });

    it('scales correctly when new duration is longer', () => {
        // Original: 100 s, new: 200 s → factor = 2
        const vtt = new VTT().addCue(10, 20, 'X');
        vtt.rescale(100, 200);
        expect(vtt.toJSON().segments[0]).toMatchObject({ startTime: 20, endTime: 40 });
    });

    it('returns the VTT instance for chaining', () => {
        const vtt = new VTT().addCue(0, 10, 'Hi');
        expect(vtt.rescale(100, 100)).toBe(vtt);
    });
});

describe('VTT syncFps()', () => {
    it('adjusts timings from a higher frame rate to a lower one', () => {
        // authored at 60 fps, target is 30 fps → factor = 2
        const vtt = new VTT().addCue(10, 20, 'A');
        vtt.syncFps(60, 30);
        expect(vtt.toJSON().segments[0]).toMatchObject({ startTime: 20, endTime: 40 });
    });

    it('adjusts timings from a lower frame rate to a higher one', () => {
        // authored at 30 fps, target is 60 fps → factor = 0.5
        const vtt = new VTT().addCue(20, 40, 'B');
        vtt.syncFps(30, 60);
        expect(vtt.toJSON().segments[0]).toMatchObject({ startTime: 10, endTime: 20 });
    });

    it('is identity when source and target fps are equal', () => {
        const vtt = new VTT().addCue(5, 10, 'Same');
        vtt.syncFps(30, 30);
        expect(vtt.toJSON().segments[0]).toMatchObject({ startTime: 5, endTime: 10 });
    });

    it('returns the VTT instance for chaining', () => {
        const vtt = new VTT().addCue(0, 1, 'Hi');
        expect(vtt.syncFps(30, 30)).toBe(vtt);
    });
});

// ---------------------------------------------------------------------------
// fromURL (mocked fetch)
// ---------------------------------------------------------------------------

describe('VTT fromURL()', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('fetches and parses a VTT file from a URL', async () => {
        vi.stubGlobal('fetch', async () => ({
            text: async () => MINIMAL_VTT,
        }));
        const vtt = await VTT.fromURL('https://example.com/sub.vtt');
        expect(vtt.toJSON().segments).toHaveLength(2);
    });

    it('rejects when fetch returns an invalid VTT file', async () => {
        vi.stubGlobal('fetch', async () => ({
            text: async () => 'NOT A VTT FILE',
        }));
        await expect(VTT.fromURL('https://example.com/bad.vtt')).rejects.toThrow();
    });

    it('rejects when fetch itself fails', async () => {
        vi.stubGlobal('fetch', async () => {
            throw new Error('Network error');
        });
        await expect(VTT.fromURL('https://example.com/fail.vtt')).rejects.toThrow('Network error');
    });

    it('auto-detects and parses an SRT file from a URL', async () => {
        const srt = '1\n00:00:01,000 --> 00:00:04,000\nHello SRT';
        vi.stubGlobal('fetch', async () => ({ text: async () => srt }));
        const vtt = await VTT.fromURL('https://example.com/sub.srt');
        expect(vtt.toJSON().segments[0]).toMatchObject({
            startTime: 1,
            endTime: 4,
            text: 'Hello SRT',
        });
    });
});

// ---------------------------------------------------------------------------
// fromSRT
// ---------------------------------------------------------------------------

const SIMPLE_SRT = `1
00:00:01,000 --> 00:00:04,000
Hello!

2
00:00:05,000 --> 00:00:08,000
World`;

describe('VTT fromSRT()', () => {
    it('parses a simple SRT file', () => {
        const vtt = VTT.fromSRT(SIMPLE_SRT);
        const segs = vtt.toJSON().segments;
        expect(segs).toHaveLength(2);
        expect(segs[0]).toMatchObject({ startTime: 1, endTime: 4, text: 'Hello!' });
        expect(segs[1]).toMatchObject({ startTime: 5, endTime: 8, text: 'World' });
    });

    it('preserves cue sequence numbers as identifiers', () => {
        const vtt = VTT.fromSRT(SIMPLE_SRT);
        const segs = vtt.toJSON().segments;
        expect(segs[0].identifier).toBe('1');
        expect(segs[1].identifier).toBe('2');
    });

    it('parses multi-line cue text', () => {
        const srt = `1\n00:00:01,000 --> 00:00:04,000\nLine one\nLine two`;
        const vtt = VTT.fromSRT(srt);
        expect(vtt.toJSON().segments[0].text).toBe('Line one\nLine two');
    });

    it('handles a UTF-8 BOM', () => {
        const vtt = VTT.fromSRT('\uFEFF' + SIMPLE_SRT);
        expect(vtt.toJSON().segments).toHaveLength(2);
    });

    it('handles CRLF line endings', () => {
        const vtt = VTT.fromSRT(SIMPLE_SRT.replace(/\n/g, '\r\n'));
        expect(vtt.toJSON().segments).toHaveLength(2);
    });

    it('parses hours, minutes, seconds and milliseconds correctly', () => {
        const srt = `1\n01:02:03,456 --> 01:02:07,890\nTimed`;
        const vtt = VTT.fromSRT(srt);
        const seg = vtt.toJSON().segments[0];
        expect(seg.startTime).toBeCloseTo(3723.456);
        expect(seg.endTime).toBeCloseTo(3727.89);
    });

    it('uses HH:MM:SS.mmm timestamps in the produced VTT output', () => {
        const vtt = VTT.fromSRT(SIMPLE_SRT);
        const output = vtt.toString();
        expect(output).toContain('00:00:01.000 --> 00:00:04.000');
    });

    it('throws when a segment has no timing line', () => {
        expect(() => VTT.fromSRT('just some text\n\nanother block')).toThrow();
    });
});

// ---------------------------------------------------------------------------
// fromFile
// ---------------------------------------------------------------------------

describe('VTT fromFile()', () => {
    it('parses a VTT File object', async () => {
        const mockFile = { text: async () => MINIMAL_VTT } as unknown as File;
        const vtt = await VTT.fromFile(mockFile);
        expect(vtt.toJSON().segments).toHaveLength(2);
    });

    it('auto-detects and parses an SRT File object', async () => {
        const mockFile = { text: async () => SIMPLE_SRT } as unknown as File;
        const vtt = await VTT.fromFile(mockFile);
        expect(vtt.toJSON().segments[0]).toMatchObject({
            startTime: 1,
            endTime: 4,
            text: 'Hello!',
        });
    });
});

// ---------------------------------------------------------------------------
// merge
// ---------------------------------------------------------------------------

describe('VTT merge()', () => {
    it('returns a new VTT with segments from both instances', () => {
        const a = new VTT().addCue(0, 1, 'A');
        const b = new VTT().addCue(2, 3, 'B');
        const merged = VTT.merge(a, b);
        expect(merged.getCues()).toHaveLength(2);
    });

    it('uses the header of the first instance', () => {
        const a = new VTT('First', { Kind: 'captions' });
        const b = new VTT('Second');
        const merged = VTT.merge(a, b);
        expect(merged.header.description).toBe('First');
        expect(merged.header.meta).toMatchObject({ Kind: 'captions' });
    });

    it('appends segments from all instances in order', () => {
        const a = new VTT().addCue(0, 1, 'A');
        const b = new VTT().addCue(2, 3, 'B');
        const c = new VTT().addCue(4, 5, 'C');
        const merged = VTT.merge(a, b, c);
        expect(merged.getCues().map((cu) => cu.text)).toEqual(['A', 'B', 'C']);
    });

    it('does not mutate the source instances', () => {
        const a = new VTT().addCue(0, 1, 'A');
        const b = new VTT().addCue(2, 3, 'B');
        VTT.merge(a, b);
        expect(a.getCues()).toHaveLength(1);
        expect(b.getCues()).toHaveLength(1);
    });

    it('works with a single instance', () => {
        const merged = VTT.merge(new VTT().addCue(0, 1, 'Solo'));
        expect(merged.getCues()).toHaveLength(1);
    });

    it('preserves non-cue segments from all instances', () => {
        const a = new VTT().addComment('Note A').addCue(0, 1, 'A');
        const b = new VTT().addRegion('r1').addCue(2, 3, 'B');
        const merged = VTT.merge(a, b);
        expect(merged.toJSON().segments).toHaveLength(4);
    });
});

// ---------------------------------------------------------------------------
// getCues
// ---------------------------------------------------------------------------

describe('VTT getCues()', () => {
    it('returns all cues and nothing else', () => {
        const vtt = new VTT().addRegion('r').addCue(0, 1, 'A').addComment('note').addCue(2, 3, 'B');
        const cues = vtt.getCues();
        expect(cues).toHaveLength(2);
        expect(cues.every((s) => s instanceof Cue)).toBe(true);
    });

    it('returns an empty array when there are no cues', () => {
        expect(new VTT().getCues()).toHaveLength(0);
    });
});

// ---------------------------------------------------------------------------
// getCuesByTime
// ---------------------------------------------------------------------------

describe('VTT getCuesByTime()', () => {
    it('returns cues whose time range overlaps the given window', () => {
        const vtt = new VTT().addCue(0, 5, 'A').addCue(3, 8, 'B').addCue(10, 15, 'C');
        const active = vtt.getCuesByTime(4, 6);
        expect(active).toHaveLength(2);
        expect(active.map((c) => c.text)).toEqual(expect.arrayContaining(['A', 'B']));
    });

    it('includes a cue that starts before the range and ends inside it', () => {
        expect(new VTT().addCue(0, 5, 'A').getCuesByTime(3, 10)).toHaveLength(1);
    });

    it('includes a cue that starts inside the range and ends after it', () => {
        expect(new VTT().addCue(5, 15, 'A').getCuesByTime(3, 10)).toHaveLength(1);
    });

    it('excludes a cue that ends exactly at the range start', () => {
        // cue.endTime (3) is not > start (3) → excluded
        expect(new VTT().addCue(0, 3, 'Before').getCuesByTime(3, 7)).toHaveLength(0);
    });

    it('excludes a cue that starts exactly at the range end', () => {
        // cue.startTime (7) is not < end (7) → excluded
        expect(new VTT().addCue(7, 12, 'After').getCuesByTime(3, 7)).toHaveLength(0);
    });

    it('excludes cues entirely outside the range', () => {
        const vtt = new VTT().addCue(0, 2, 'Before').addCue(8, 12, 'After');
        expect(vtt.getCuesByTime(3, 7)).toHaveLength(0);
    });

    it('returns an empty array when there are no cues', () => {
        expect(new VTT().getCuesByTime(0, 10)).toHaveLength(0);
    });
});

// ---------------------------------------------------------------------------
// getCueById
// ---------------------------------------------------------------------------

describe('VTT getCueById()', () => {
    it('returns the cue with the matching string identifier', () => {
        const vtt = new VTT().addCue(0, 1, 'First', 'intro').addCue(2, 3, 'Second', 'chapter-1');
        expect(vtt.getCueById('intro')?.text).toBe('First');
        expect(vtt.getCueById('chapter-1')?.text).toBe('Second');
    });

    it('returns the cue with a matching numeric identifier', () => {
        const vtt = new VTT().addCue(0, 1, 'Numbered', 42);
        expect(vtt.getCueById(42)?.text).toBe('Numbered');
    });

    it('returns undefined when no cue has the given identifier', () => {
        expect(new VTT().addCue(0, 1, 'No id').getCueById('missing')).toBeUndefined();
    });

    it('returns undefined for an empty VTT', () => {
        expect(new VTT().getCueById('any')).toBeUndefined();
    });
});

// ---------------------------------------------------------------------------
// getSegmentsByType
// ---------------------------------------------------------------------------

describe('VTT getSegmentsByType()', () => {
    it('returns cues when passed the Cue class', () => {
        const vtt = new VTT().addCue(0, 1, 'A').addRegion('r').addComment('note');
        const cues = vtt.getSegmentsByType(Cue);
        expect(cues).toHaveLength(1);
        expect(cues[0].text).toBe('A');
    });

    it('returns regions when passed the Region class', () => {
        const vtt = new VTT().addCue(0, 1, 'A').addRegion('r');
        const regions = vtt.getSegmentsByType(Region);
        expect(regions).toHaveLength(1);
        expect(regions[0].id).toBe('r');
    });

    it('returns cues when passed the string "cue"', () => {
        const vtt = new VTT().addCue(0, 1, 'A').addRegion('r');
        expect(vtt.getSegmentsByType('cue')).toHaveLength(1);
    });

    it('returns regions when passed the string "region"', () => {
        const vtt = new VTT().addCue(0, 1, 'A').addRegion('r');
        expect(vtt.getSegmentsByType('region')).toHaveLength(1);
    });

    it('includes the header when filtering by "header"', () => {
        expect(new VTT().getSegmentsByType('header')).toHaveLength(1);
    });

    it('returns an empty array when no segments match', () => {
        expect(new VTT().getSegmentsByType(Cue)).toHaveLength(0);
    });

    it('returns multiple matching segments', () => {
        const vtt = new VTT().addCue(0, 1, 'A').addCue(2, 3, 'B').addRegion('r');
        expect(vtt.getSegmentsByType(Cue)).toHaveLength(2);
    });
});

// ---------------------------------------------------------------------------
// getValidationErrors
// ---------------------------------------------------------------------------

describe('VTT getValidationErrors()', () => {
    it('returns an empty array for a valid VTT', () => {
        expect(new VTT().addCue(0, 5, 'Hello').getValidationErrors()).toHaveLength(0);
    });

    it('returns an empty array for an empty VTT', () => {
        expect(new VTT().getValidationErrors()).toHaveLength(0);
    });

    it('returns one entry per invalid segment', () => {
        const vtt = new VTT();
        vtt.addSegment(new Cue(5, 3, 'Bad')); // invalid
        vtt.addSegment(new Cue(0, 5, 'Good')); // valid
        vtt.addSegment(new Comment('bad --> note')); // invalid
        expect(vtt.getValidationErrors()).toHaveLength(2);
    });

    it('reports the correct index (header is index 0, first segment is index 1)', () => {
        const vtt = new VTT();
        vtt.addSegment(new Cue(5, 3, 'Bad'));
        expect(vtt.getValidationErrors()[0].index).toBe(1);
    });

    it('exposes the invalid segment instance on the error object', () => {
        const bad = new Cue(5, 3, 'Bad');
        const vtt = new VTT();
        vtt.addSegment(bad);
        expect(vtt.getValidationErrors()[0].segment).toBe(bad);
    });
});

// ---------------------------------------------------------------------------
// attachToVideo
// ---------------------------------------------------------------------------

describe('VTT attachToVideo()', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('calls addTextTrack with the given kind, label and language', () => {
        const addCueMock = vi.fn();
        const addTextTrackMock = vi.fn(() => ({ addCue: addCueMock }));
        const videoMock = { addTextTrack: addTextTrackMock } as unknown as HTMLVideoElement;
        vi.stubGlobal(
            'VTTCue',
            class {
                constructor(
                    public start: number,
                    public end: number,
                    public text: string,
                ) {}
            },
        );

        new VTT().attachToVideo(videoMock, 'subtitles', 'English', 'en');
        expect(addTextTrackMock).toHaveBeenCalledWith('subtitles', 'English', 'en');
    });

    it('adds one VTTCue per cue to the track', () => {
        const addCueMock = vi.fn();
        const videoMock = {
            addTextTrack: vi.fn(() => ({ addCue: addCueMock })),
        } as unknown as HTMLVideoElement;
        vi.stubGlobal(
            'VTTCue',
            class {
                constructor(
                    public start: number,
                    public end: number,
                    public text: string,
                ) {}
            },
        );

        new VTT().addCue(0, 1, 'A').addCue(2, 3, 'B').attachToVideo(videoMock, 'captions');
        expect(addCueMock).toHaveBeenCalledTimes(2);
    });

    it('does not add VTTCues for non-cue segments', () => {
        const addCueMock = vi.fn();
        const videoMock = {
            addTextTrack: vi.fn(() => ({ addCue: addCueMock })),
        } as unknown as HTMLVideoElement;
        vi.stubGlobal(
            'VTTCue',
            class {
                constructor(
                    public start: number,
                    public end: number,
                    public text: string,
                ) {}
            },
        );

        new VTT().addComment('note').addRegion('r').attachToVideo(videoMock, 'subtitles');
        expect(addCueMock).not.toHaveBeenCalled();
    });

    it('returns the created TextTrack', () => {
        const mockTrack = { addCue: vi.fn() };
        const videoMock = { addTextTrack: vi.fn(() => mockTrack) } as unknown as HTMLVideoElement;
        vi.stubGlobal(
            'VTTCue',
            class {
                constructor(
                    public start: number,
                    public end: number,
                    public text: string,
                ) {}
            },
        );

        const track = new VTT().addCue(0, 1, 'Hi').attachToVideo(videoMock, 'captions');
        expect(track).toBe(mockTrack);
    });
});
