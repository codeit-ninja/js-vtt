import { describe, it, expect } from 'vitest';
import { Header } from '../../src/segments/header';

describe('Header', () => {
    describe('constructor', () => {
        it('creates a bare header with no args', () => {
            const h = new Header();
            expect(h.description).toBeUndefined();
            expect(h.meta).toEqual({});
        });

        it('stores the description', () => {
            const h = new Header('English captions');
            expect(h.description).toBe('English captions');
        });

        it('stores metadata', () => {
            const h = new Header(undefined, { Kind: 'captions', Language: 'en' });
            expect(h.meta).toEqual({ Kind: 'captions', Language: 'en' });
        });

        it('stores both description and metadata', () => {
            const h = new Header('Live', { Kind: 'metadata' });
            expect(h.description).toBe('Live');
            expect(h.meta).toEqual({ Kind: 'metadata' });
        });
    });

    describe('setDescription()', () => {
        it('updates the description', () => {
            const h = new Header('Old');
            h.setDescription('New');
            expect(h.description).toBe('New');
        });
    });

    describe('setMeta()', () => {
        it('replaces the entire meta object', () => {
            const h = new Header(undefined, { Kind: 'captions' });
            h.setMeta({ Language: 'fr' });
            expect(h.meta).toEqual({ Language: 'fr' });
        });
    });

    describe('valid', () => {
        it('returns true for a bare header', () => {
            expect(new Header().valid).toBe(true);
        });

        it('returns true for a header with description', () => {
            expect(new Header('Nice description').valid).toBe(true);
        });

        it('returns false if description contains a newline', () => {
            expect(new Header('Bad\ndescription').valid).toBe(false);
        });

        it('returns false if description contains a carriage return', () => {
            expect(new Header('Bad\rdescription').valid).toBe(false);
        });

        it('returns true when metadata is present', () => {
            expect(new Header(undefined, { Kind: 'captions' }).valid).toBe(true);
        });
    });

    describe('toString()', () => {
        it('outputs bare WEBVTT', () => {
            expect(new Header().toString()).toBe('WEBVTT');
        });

        it('outputs WEBVTT with description separated by a space', () => {
            expect(new Header('English').toString()).toBe('WEBVTT English');
        });

        it('outputs WEBVTT with one metadata entry', () => {
            expect(new Header(undefined, { Kind: 'captions' }).toString()).toBe(
                'WEBVTT\nKind: captions',
            );
        });

        it('outputs WEBVTT with multiple metadata entries', () => {
            const h = new Header(undefined, { Kind: 'captions', Language: 'en' });
            expect(h.toString()).toBe('WEBVTT\nKind: captions\nLanguage: en');
        });

        it('outputs WEBVTT with description and metadata', () => {
            const h = new Header('Live', { Kind: 'metadata' });
            expect(h.toString()).toBe('WEBVTT Live\nKind: metadata');
        });

        it('returns empty string in srt format', () => {
            expect(new Header('English').toString('srt')).toBe('');
        });

        it('returns empty string in srt format even with meta', () => {
            expect(new Header(undefined, { Kind: 'captions' }).toString('srt')).toBe('');
        });
    });

    describe('toJSON()', () => {
        it('returns description and meta', () => {
            const h = new Header('Live', { Kind: 'captions' });
            expect(h.toJSON()).toEqual({
                _type: 'header',
                description: 'Live',
                meta: { Kind: 'captions' },
            });
        });

        it('returns undefined description when not set', () => {
            const h = new Header();
            expect(h.toJSON()).toEqual({ _type: 'header', description: undefined, meta: {} });
        });
    });

    describe('fromString()', () => {
        it('parses a bare WEBVTT header', () => {
            const h = Header.fromString('WEBVTT');
            expect(h.description).toBeUndefined();
            expect(h.meta).toEqual({});
        });

        it('parses a header with a description', () => {
            const h = Header.fromString('WEBVTT English captions');
            expect(h.description).toBe('English captions');
        });

        it('parses a header with one metadata entry', () => {
            const h = Header.fromString('WEBVTT\nKind: captions');
            expect(h.meta).toMatchObject({ Kind: 'captions' });
        });

        it('parses a header with multiple metadata entries', () => {
            const h = Header.fromString('WEBVTT\nKind: captions\nLanguage: en');
            expect(h.meta).toMatchObject({ Kind: 'captions', Language: 'en' });
        });

        it('preserves meta values that contain ": " (colon-space)', () => {
            // e.g. a URL with a protocol like https://example.com/path: value
            const h = Header.fromString('WEBVTT\nURL: https://example.com/path: extra');
            expect(h.meta).toMatchObject({ URL: 'https://example.com/path: extra' });
        });

        it('parses a meta value with multiple colon-space occurrences without truncating', () => {
            const h = Header.fromString('WEBVTT\nTitle: foo: bar: baz');
            expect(h.meta).toMatchObject({ Title: 'foo: bar: baz' });
        });

        it('round-trips through toString and back', () => {
            const original = new Header('Live', { Kind: 'metadata', Language: 'fr' });
            const parsed = Header.fromString(original.toString());
            expect(parsed.description).toBe(original.description);
            expect(parsed.meta).toMatchObject(original.meta);
        });
    });
});
