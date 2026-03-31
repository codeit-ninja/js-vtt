import { describe, it, expect } from 'vitest';
import { isHeader, isStyle, isNote, isCue, isRegion, isComment } from './helpers';

describe('isHeader', () => {
    it('matches bare WEBVTT', () => {
        expect(isHeader('WEBVTT')).toBe(true);
    });

    it('matches WEBVTT with a description', () => {
        expect(isHeader('WEBVTT - English captions')).toBe(true);
    });

    it('matches WEBVTT with metadata lines below', () => {
        expect(isHeader('WEBVTT\nKind: captions\nLanguage: en')).toBe(true);
    });

    it('matches WEBVTT with UTF-8 BOM', () => {
        expect(isHeader('\uFEFFWEBVTT')).toBe(true);
    });

    it('matches WEBVTT BOM with description', () => {
        expect(isHeader('\uFEFFWEBVTT Live captions')).toBe(true);
    });

    it('does not match an empty string', () => {
        expect(isHeader('')).toBe(false);
    });

    it('does not match a cue timing line', () => {
        expect(isHeader('00:00:01.000 --> 00:00:04.000')).toBe(false);
    });

    it('does not match lowercase webvtt', () => {
        expect(isHeader('webvtt')).toBe(false);
    });

    it('does not match a mid-string WEBVTT occurrence', () => {
        expect(isHeader('NOTE WEBVTT')).toBe(false);
    });

    it('does not match WEBVTTx (7th char must be space/tab/LF or end)', () => {
        expect(isHeader('WEBVTTx rest of content')).toBe(false);
    });

    it('matches WEBVTT followed by tab', () => {
        expect(isHeader('WEBVTT\tThis is a description')).toBe(true);
    });

    it('matches WEBVTT followed by LF', () => {
        expect(isHeader('WEBVTT\nKind: captions')).toBe(true);
    });
});

describe('isStyle', () => {
    it('matches STYLE', () => {
        expect(isStyle('STYLE')).toBe(true);
    });

    it('matches STYLE with content', () => {
        expect(isStyle('STYLE\n::cue { color: white; }')).toBe(true);
    });

    it('does not match lowercase style', () => {
        expect(isStyle('style')).toBe(false);
    });

    it('does not match other segment types', () => {
        expect(isStyle('REGION')).toBe(false);
    });
});

describe('isNote', () => {
    it('matches bare NOTE', () => {
        expect(isNote('NOTE')).toBe(true);
    });

    it('matches NOTE with inline text', () => {
        expect(isNote('NOTE This is a comment')).toBe(true);
    });

    it('matches NOTE with a block body', () => {
        expect(isNote('NOTE\nThis is a comment')).toBe(true);
    });

    it('does not match lowercase note', () => {
        expect(isNote('note')).toBe(false);
    });
});

describe('isCue', () => {
    it('matches a simple cue without identifier', () => {
        const cue = '00:00:01.000 --> 00:00:04.000\nHello world';
        expect(isCue(cue)).toBe(true);
    });

    it('matches a cue with a string identifier', () => {
        const cue = 'intro\n00:00:00.000 --> 00:00:05.000\nWelcome';
        expect(isCue(cue)).toBe(true);
    });

    it('matches a cue with a numeric identifier', () => {
        const cue = '1\n00:00:01.000 --> 00:00:04.000\nHello';
        expect(isCue(cue)).toBe(true);
    });

    it('matches a cue with cue settings on the timing line', () => {
        const cue = '00:00:01.000 --> 00:00:04.000 align:center size:80%\nHello';
        expect(isCue(cue)).toBe(true);
    });

    it('matches short mm:ss.mmm timestamps', () => {
        const cue = '01:23.456 --> 01:26.789\nShort form';
        expect(isCue(cue)).toBe(true);
    });

    it('does not match a WEBVTT header', () => {
        expect(isCue('WEBVTT')).toBe(false);
    });

    it('does not match a NOTE block', () => {
        expect(isCue('NOTE\nA comment')).toBe(false);
    });

    it('does not match a REGION block', () => {
        expect(isCue('REGION\nid:fred')).toBe(false);
    });

    it('does not match a STYLE block', () => {
        expect(isCue('STYLE\n::cue { color: white; }')).toBe(false);
    });
});

describe('isRegion', () => {
    it('matches bare REGION', () => {
        expect(isRegion('REGION')).toBe(true);
    });

    it('matches REGION with settings', () => {
        expect(isRegion('REGION\nid:fred\nwidth:40%')).toBe(true);
    });

    it('does not match REGIONS (plural)', () => {
        expect(isRegion('REGIONS')).toBe(false);
    });

    it('does not match lowercase region', () => {
        expect(isRegion('region')).toBe(false);
    });
});

describe('isComment', () => {
    it('matches bare NOTE', () => {
        expect(isComment('NOTE')).toBe(true);
    });

    it('matches NOTE with block body', () => {
        expect(isComment('NOTE\nThis is a comment')).toBe(true);
    });

    it('does not match NOTE with inline text (uses isNote for that)', () => {
        // isComment checks ^NOTE(\n|$) so "NOTE text" should NOT match
        expect(isComment('NOTE This is inline')).toBe(false);
    });

    it('does not match lowercase note', () => {
        expect(isComment('note')).toBe(false);
    });
});
