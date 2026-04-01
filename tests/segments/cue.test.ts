import { describe, it, expect } from 'vitest';
import { Cue } from '../../src/segments/cue';
import InvalidCueError from '../../src/errors/InvalidCueError';

describe('Cue', () => {
    describe('constructor & getters', () => {
        it('stores all provided values', () => {
            const cue = new Cue(1, 4, 'Hello', 'intro', { align: 'center' });
            expect(cue.startTime).toBe(1);
            expect(cue.endTime).toBe(4);
            expect(cue.text).toBe('Hello');
            expect(cue.identifier).toBe('intro');
            expect(cue.settings).toEqual({ align: 'center' });
        });

        it('defaults settings to an empty object', () => {
            const cue = new Cue(0, 2, 'Hi');
            expect(cue.settings).toEqual({});
        });

        it('accepts a numeric identifier', () => {
            const cue = new Cue(0, 1, 'Text', 42);
            expect(cue.identifier).toBe(42);
        });

        it('identifier is undefined when not provided', () => {
            const cue = new Cue(0, 1, 'Text');
            expect(cue.identifier).toBeUndefined();
        });
    });

    describe('setters (fluent chaining)', () => {
        it('setStartTime returns the cue and updates startTime', () => {
            const cue = new Cue(0, 5, 'Text');
            const result = cue.setStartTime(2);
            expect(result).toBe(cue);
            expect(cue.startTime).toBe(2);
        });

        it('setEndTime returns the cue and updates endTime', () => {
            const cue = new Cue(0, 5, 'Text');
            const result = cue.setEndTime(8);
            expect(result).toBe(cue);
            expect(cue.endTime).toBe(8);
        });

        it('setText returns the cue and updates text', () => {
            const cue = new Cue(0, 5, 'Old');
            const result = cue.setText('New');
            expect(result).toBe(cue);
            expect(cue.text).toBe('New');
        });

        it('setIdentifier returns the cue and updates identifier', () => {
            const cue = new Cue(0, 5, 'Text');
            const result = cue.setIdentifier('cue-1');
            expect(result).toBe(cue);
            expect(cue.identifier).toBe('cue-1');
        });

        it('setSettings returns the cue and updates settings', () => {
            const cue = new Cue(0, 5, 'Text');
            const result = cue.setSettings({ align: 'end', size: '50%' });
            expect(result).toBe(cue);
            expect(cue.settings).toEqual({ align: 'end', size: '50%' });
        });

        it('supports full method chain', () => {
            const cue = new Cue(0, 1, 'A')
                .setStartTime(2)
                .setEndTime(6)
                .setText('B')
                .setIdentifier('c')
                .setSettings({ align: 'start' });
            expect(cue.startTime).toBe(2);
            expect(cue.endTime).toBe(6);
            expect(cue.text).toBe('B');
            expect(cue.identifier).toBe('c');
            expect(cue.settings).toEqual({ align: 'start' });
        });
    });

    describe('removeTags()', () => {
        it('strips a simple bold tag', () => {
            const cue = new Cue(0, 1, '<b>Hello</b>');
            cue.removeTags();
            expect(cue.text).toBe('Hello');
        });

        it('strips voice/class span tags', () => {
            const cue = new Cue(0, 1, '<v.loud Bob>Hello there</v>');
            cue.removeTags();
            expect(cue.text).toBe('Hello there');
        });

        it('strips color class tags', () => {
            const cue = new Cue(0, 1, '<c.yellow>Warning</c>');
            cue.removeTags();
            expect(cue.text).toBe('Warning');
        });

        it('leaves plain text untouched', () => {
            const cue = new Cue(0, 1, 'No tags here');
            cue.removeTags();
            expect(cue.text).toBe('No tags here');
        });

        it('returns the cue for chaining', () => {
            const cue = new Cue(0, 1, '<i>Italic</i>');
            expect(cue.removeTags()).toBe(cue);
        });
    });

    describe('valid', () => {
        it('returns true for valid cue', () => {
            expect(new Cue(0, 5, 'Hello').valid).toBe(true);
        });

        it('returns false when startTime is negative', () => {
            expect(new Cue(-1, 5, 'Hello').valid).toBe(false);
        });

        it('returns false when endTime equals startTime', () => {
            expect(new Cue(5, 5, 'Hello').valid).toBe(false);
        });

        it('returns false when endTime is less than startTime', () => {
            expect(new Cue(6, 3, 'Hello').valid).toBe(false);
        });

        it('returns false when text contains -->', () => {
            expect(new Cue(0, 5, 'bad --> text').valid).toBe(false);
        });

        it('returns false when string identifier contains -->', () => {
            expect(new Cue(0, 5, 'Hello', 'id --> bad').valid).toBe(false);
        });

        it('returns false when identifier contains a newline', () => {
            expect(new Cue(0, 5, 'Hello', 'bad\nid').valid).toBe(false);
        });

        it('returns false when identifier contains a carriage return', () => {
            expect(new Cue(0, 5, 'Hello', 'bad\rid').valid).toBe(false);
        });

        it('accepts a numeric identifier', () => {
            expect(new Cue(0, 5, 'Hello', 1).valid).toBe(true);
        });

        it('returns true when startTime is 0', () => {
            expect(new Cue(0, 0.001, 'Hi').valid).toBe(true);
        });
    });

    describe('toString()', () => {
        it('outputs VTT format without identifier', () => {
            const cue = new Cue(1, 4, 'Hello');
            expect(cue.toString('vtt')).toBe('00:00:01.000 --> 00:00:04.000\nHello');
        });

        it('outputs VTT format with string identifier', () => {
            const cue = new Cue(1, 4, 'Hello', 'intro');
            expect(cue.toString('vtt')).toBe('intro\n00:00:01.000 --> 00:00:04.000\nHello');
        });

        it('outputs VTT format with numeric identifier', () => {
            const cue = new Cue(0, 2, 'Hi', 1);
            expect(cue.toString('vtt')).toBe('1\n00:00:00.000 --> 00:00:02.000\nHi');
        });

        it('outputs VTT format with cue settings', () => {
            const cue = new Cue(0, 3, 'Text', undefined, { align: 'center', size: '80%' });
            expect(cue.toString('vtt')).toBe(
                '00:00:00.000 --> 00:00:03.000 align:center size:80%\nText',
            );
        });

        it('defaults to vtt format', () => {
            const cue = new Cue(0, 1, 'Hi');
            expect(cue.toString()).toBe(cue.toString('vtt'));
        });

        it('outputs hour-padded timestamps', () => {
            // 3661.5 seconds = 1h 1m 1.5s
            const cue = new Cue(3661.5, 3665, 'Late');
            expect(cue.toString('vtt')).toContain('01:01:01.500 --> 01:01:05.000');
        });

        it('outputs SRT format with sequential index', () => {
            const cue = new Cue(1, 4, 'Hello');
            expect(cue.toString('srt', 1)).toBe('1\n00:00:01,000 --> 00:00:04,000\nHello');
        });

        it('strips tags in SRT output', () => {
            const cue = new Cue(0, 2, '<b>Bold</b> text');
            expect(cue.toString('srt', 3)).toBe('3\n00:00:00,000 --> 00:00:02,000\nBold text');
        });

        it('uses commas in SRT timing (not dots)', () => {
            const cue = new Cue(1.5, 4.25, 'Test');
            const srt = cue.toString('srt', 1);
            expect(srt).toContain('00:00:01,500 --> 00:00:04,250');
        });

        it('handles timestamps >= 24 hours correctly without wrapping', () => {
            // 24h = 86400s; Date.toISOString wraps to 00:00:00 — verify we no longer do that
            const cue = new Cue(86400, 86404, 'Very late');
            expect(cue.toString('vtt')).toContain('24:00:00.000 --> 24:00:04.000');
        });

        it('handles timestamps >= 48 hours', () => {
            const cue = new Cue(172800, 172801, 'Two days');
            expect(cue.toString('vtt')).toContain('48:00:00.000 --> 48:00:01.000');
        });

        it('handles sub-second precision near 24h boundary', () => {
            const cue = new Cue(86399.5, 86400.25, 'Boundary');
            expect(cue.toString('vtt')).toContain('23:59:59.500 --> 24:00:00.250');
        });
    });

    describe('toJSON()', () => {
        it('returns all cue properties', () => {
            const cue = new Cue(1, 4, 'Hello', 'intro', { align: 'center' });
            expect(cue.toJSON()).toEqual({
                _type: 'cue',
                identifier: 'intro',
                startTime: 1,
                endTime: 4,
                text: 'Hello',
                settings: { align: 'center' },
            });
        });

        it('returns undefined for missing identifier', () => {
            const cue = new Cue(0, 1, 'Hi');
            expect(cue.toJSON().identifier).toBeUndefined();
        });
    });

    describe('fromString()', () => {
        it('parses a cue without identifier', () => {
            const cue = Cue.fromString('00:00:01.000 --> 00:00:04.000\nHello world');
            expect(cue.startTime).toBe(1);
            expect(cue.endTime).toBe(4);
            expect(cue.text).toBe('Hello world');
            expect(cue.identifier).toBeUndefined();
        });

        it('parses a cue with a string identifier', () => {
            const cue = Cue.fromString('intro\n00:00:00.500 --> 00:00:03.000\nWelcome');
            expect(cue.identifier).toBe('intro');
            expect(cue.startTime).toBe(0.5);
            expect(cue.endTime).toBe(3);
            expect(cue.text).toBe('Welcome');
        });

        it('parses a cue with a numeric-looking identifier', () => {
            // Identifiers that purely look like numbers are still string identifiers
            const cue = Cue.fromString('42\n00:00:01.000 --> 00:00:02.000\nText');
            expect(cue.identifier).toBe('42');
        });

        it('parses cue settings from the timing line', () => {
            const cue = Cue.fromString(
                '00:00:01.000 --> 00:00:04.000 align:center size:80%\nPositioned',
            );
            expect(cue.settings).toMatchObject({ align: 'center', size: '80%' });
        });

        it('parses all CueSettings keys', () => {
            const cue = Cue.fromString(
                '00:00:01.000 --> 00:00:05.000 vertical:rl line:0 position:50% size:60% align:end\nText',
            );
            expect(cue.settings).toMatchObject({
                vertical: 'rl',
                line: '0',
                position: '50%',
                size: '60%',
                align: 'end',
            });
        });

        it('parses a region setting', () => {
            const cue = Cue.fromString('00:00:01.000 --> 00:00:03.000 region:bottom\nIn a region');
            expect(cue.settings).toMatchObject({ region: 'bottom' });
        });

        it('parses multi-line cue text', () => {
            const cue = Cue.fromString('00:00:01.000 --> 00:00:04.000\nLine one\nLine two');
            expect(cue.text).toBe('Line one\nLine two');
        });

        it('parses short mm:ss.mmm timestamps', () => {
            const cue = Cue.fromString('01:23.456 --> 01:26.789\nShort form');
            expect(cue.startTime).toBeCloseTo(83.456, 3);
            expect(cue.endTime).toBeCloseTo(86.789, 3);
        });

        it('parses cue text that contains VTT markup tags', () => {
            const cue = Cue.fromString('00:00:00.000 --> 00:00:02.000\n<b>Bold</b> text');
            expect(cue.text).toBe('<b>Bold</b> text');
        });

        it('throws InvalidCueError for malformed input', () => {
            expect(() => Cue.fromString('not a cue')).toThrow(InvalidCueError);
        });

        it('throws InvalidCueError when timing arrow is missing', () => {
            expect(() => Cue.fromString('00:00:01.000 00:00:04.000\nMissing arrow')).toThrow(
                InvalidCueError,
            );
        });

        it('round-trips through toString and back', () => {
            const original = new Cue(5, 10, 'Hello', 'c1', { align: 'center' });
            const parsed = Cue.fromString(original.toString('vtt'));
            expect(parsed.startTime).toBe(original.startTime);
            expect(parsed.endTime).toBe(original.endTime);
            expect(parsed.text).toBe(original.text);
            expect(String(parsed.identifier)).toBe(String(original.identifier));
        });
    });
});
