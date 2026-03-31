import { describe, it, expect } from 'vitest';
import { Region } from './region';
import InvalidRegionError from '../errors/InvalidRegionError';

describe('Region', () => {
    describe('constructor & getters', () => {
        it('creates an empty region with no args', () => {
            const r = new Region();
            expect(r.id).toBeUndefined();
            expect(r.width).toBeUndefined();
            expect(r.lines).toBeUndefined();
            expect(r.regionAnchor).toBeUndefined();
            expect(r.viewportAnchor).toBeUndefined();
            expect(r.scroll).toBeUndefined();
        });

        it('stores all provided values', () => {
            const r = new Region('fred', 40, 3, [0, 100], [10, 90], 'up');
            expect(r.id).toBe('fred');
            expect(r.width).toBe(40);
            expect(r.lines).toBe(3);
            expect(r.regionAnchor).toEqual([0, 100]);
            expect(r.viewportAnchor).toEqual([10, 90]);
            expect(r.scroll).toBe('up');
        });
    });

    describe('setters (fluent chaining)', () => {
        it('setId returns region and updates id', () => {
            const r = new Region();
            expect(r.setId('top')).toBe(r);
            expect(r.id).toBe('top');
        });

        it('setWidth returns region and updates width', () => {
            const r = new Region();
            expect(r.setWidth(80)).toBe(r);
            expect(r.width).toBe(80);
        });

        it('setLines returns region and updates lines', () => {
            const r = new Region();
            expect(r.setLines(2)).toBe(r);
            expect(r.lines).toBe(2);
        });

        it('setRegionAnchor returns region and updates anchor', () => {
            const r = new Region();
            expect(r.setRegionAnchor([50, 50])).toBe(r);
            expect(r.regionAnchor).toEqual([50, 50]);
        });

        it('setViewportAnchor returns region and updates anchor', () => {
            const r = new Region();
            expect(r.setViewportAnchor([0, 100])).toBe(r);
            expect(r.viewportAnchor).toEqual([0, 100]);
        });

        it('setScroll returns region and updates scroll', () => {
            const r = new Region();
            expect(r.setScroll('up')).toBe(r);
            expect(r.scroll).toBe('up');
        });

        it('supports full method chain', () => {
            const r = new Region()
                .setId('bottom')
                .setWidth(40)
                .setLines(3)
                .setRegionAnchor([0, 100])
                .setViewportAnchor([10, 90])
                .setScroll('up');
            expect(r.id).toBe('bottom');
            expect(r.width).toBe(40);
            expect(r.lines).toBe(3);
            expect(r.regionAnchor).toEqual([0, 100]);
            expect(r.viewportAnchor).toEqual([10, 90]);
            expect(r.scroll).toBe('up');
        });
    });

    describe('isValid()', () => {
        it('returns true for a fully populated valid region', () => {
            const r = new Region('fred', 40, 3, [0, 100], [10, 90], 'up');
            expect(r.isValid()).toBe(true);
        });

        it('returns true for an empty region', () => {
            expect(new Region().isValid()).toBe(true);
        });

        it('returns true when width is 0', () => {
            expect(new Region('r', 0).isValid()).toBe(true);
        });

        it('returns true when width is 100', () => {
            expect(new Region('r', 100).isValid()).toBe(true);
        });

        it('returns false when width is negative', () => {
            expect(new Region('r', -1).isValid()).toBe(false);
        });

        it('returns false when width exceeds 100', () => {
            expect(new Region('r', 101).isValid()).toBe(false);
        });

        it('returns false when lines is negative', () => {
            expect(new Region('r', undefined, -1).isValid()).toBe(false);
        });

        it('returns false when lines is a float', () => {
            expect(new Region('r', undefined, 1.5).isValid()).toBe(false);
        });

        it('returns true when lines is 0', () => {
            expect(new Region('r', undefined, 0).isValid()).toBe(true);
        });

        it('returns false when id contains a tab character', () => {
            expect(new Region('bad\tid').isValid()).toBe(false);
        });

        it('returns false when id contains a space', () => {
            expect(new Region('bad id').isValid()).toBe(false);
        });

        it('returns false when id contains a newline', () => {
            expect(new Region('bad\nid').isValid()).toBe(false);
        });

        it('returns false when id contains -->', () => {
            expect(new Region('id-->bad').isValid()).toBe(false);
        });

        it('returns false when regionAnchor x is out of range', () => {
            expect(new Region('r', undefined, undefined, [-1, 50]).isValid()).toBe(false);
        });

        it('returns false when regionAnchor y exceeds 100', () => {
            expect(new Region('r', undefined, undefined, [50, 101]).isValid()).toBe(false);
        });

        it('returns false when viewportAnchor is out of range', () => {
            expect(new Region('r', undefined, undefined, undefined, [50, -1]).isValid()).toBe(
                false,
            );
        });

        it('returns true for 0% and 100% anchor values', () => {
            expect(new Region('r', undefined, undefined, [0, 0], [100, 100]).isValid()).toBe(true);
        });
    });

    describe('toString()', () => {
        it('outputs bare REGION for an empty region', () => {
            expect(new Region().toString()).toBe('REGION');
        });

        it('outputs a full REGION block matching the WebVTT spec example', () => {
            const r = new Region('fred', 40, 3, [0, 100], [10, 90], 'up');
            const expected = [
                'REGION',
                'id:fred',
                'width:40%',
                'lines:3',
                'regionanchor:0%,100%',
                'viewportanchor:10%,90%',
                'scroll:up',
            ].join('\n');
            expect(r.toString()).toBe(expected);
        });

        it('omits undefined properties', () => {
            const r = new Region('only-id');
            expect(r.toString()).toBe('REGION\nid:only-id');
        });

        it('outputs REGION with only width and lines', () => {
            const r = new Region(undefined, 80, 2);
            expect(r.toString()).toBe('REGION\nwidth:80%\nlines:2');
        });

        it('returns empty string in srt format', () => {
            expect(new Region('fred', 40, 3).toString('srt')).toBe('');
        });
    });

    describe('toJSON()', () => {
        it('returns all region properties', () => {
            const r = new Region('fred', 40, 3, [0, 100], [10, 90], 'up');
            expect(r.toJSON()).toEqual({
                id: 'fred',
                width: 40,
                lines: 3,
                regionAnchor: [0, 100],
                viewportAnchor: [10, 90],
                scroll: 'up',
            });
        });

        it('returns undefined for all optional fields', () => {
            expect(new Region().toJSON()).toEqual({
                id: undefined,
                width: undefined,
                lines: undefined,
                regionAnchor: undefined,
                viewportAnchor: undefined,
                scroll: undefined,
            });
        });
    });

    describe('fromString()', () => {
        it('parses the full WebVTT spec example', () => {
            const raw = [
                'REGION',
                'id:fred',
                'width:40%',
                'lines:3',
                'regionanchor:0%,100%',
                'viewportanchor:10%,90%',
                'scroll:up',
            ].join('\n');
            const r = Region.fromString(raw);
            expect(r.id).toBe('fred');
            expect(r.width).toBe(40);
            expect(r.lines).toBe(3);
            expect(r.regionAnchor).toEqual([0, 100]);
            expect(r.viewportAnchor).toEqual([10, 90]);
            expect(r.scroll).toBe('up');
        });

        it('parses a minimal region with just an id', () => {
            const r = Region.fromString('REGION\nid:bottom');
            expect(r.id).toBe('bottom');
            expect(r.width).toBeUndefined();
        });

        it('parses a region with only width and lines', () => {
            const r = Region.fromString('REGION\nwidth:80%\nlines:2');
            expect(r.width).toBe(80);
            expect(r.lines).toBe(2);
        });

        it('ignores unknown keys', () => {
            const r = Region.fromString('REGION\nid:test\nunknown:value');
            expect(r.id).toBe('test');
        });

        it('throws InvalidRegionError for non-REGION input', () => {
            expect(() => Region.fromString('NOTREGION\nid:bad')).toThrow(InvalidRegionError);
        });

        it('round-trips through toString and back', () => {
            const original = new Region('fred', 40, 3, [0, 100], [10, 90], 'up');
            const parsed = Region.fromString(original.toString());
            expect(parsed.id).toBe(original.id);
            expect(parsed.width).toBe(original.width);
            expect(parsed.lines).toBe(original.lines);
            expect(parsed.regionAnchor).toEqual(original.regionAnchor);
            expect(parsed.viewportAnchor).toEqual(original.viewportAnchor);
            expect(parsed.scroll).toBe(original.scroll);
        });
    });
});
