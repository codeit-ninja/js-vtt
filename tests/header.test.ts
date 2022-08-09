import { describe, it, beforeEach, expect } from 'vitest'

import Header from '../src/webvtt/segments/Header';
import InvalidHeaderError from "../src/errors/InvalidHeaderError";

type HeaderMeta = {
    language: string;
    author: string;
}

describe('Comment', () => {
    let header: Header<HeaderMeta>;

    beforeEach(() => {
        header = new Header('- Translation for RRR movie.', {
            language: 'Dutch',
            author: 'Richard'
        })
    });

    it('Should contain properties.', () => {
        const expected = {
            description: '- Translation for RRR movie.',
            meta: expect.objectContaining({
                language: 'Dutch',
                author: 'Richard'
            })
        }

        expect(header).toMatchObject(expected);
    })

    it('Can generate a valid WebVTT header string.', () => {
        const expected = 'WEBVTT - Translation for RRR movie.\n' +
            'language: Dutch\n' +
            'author: Richard';

        expect(header.toString()).toBe(expected);
    })

    it('Can update properties.', () => {
        header.setDescription('Hello world');
        header.setMeta({
            language: 'German',
            author: 'Heinrich'
        });

        let expected = {
            description: 'Hello world',
            meta: expect.objectContaining({
                language: 'German',
                author: 'Heinrich'
            })
        }

        expect(header).toMatchObject(expected);
    })

    it('Can create a header instance from string.', () => {
        const h = 'WEBVTT - Translation for RRR movie.\n' +
            'language: Dutch\n' +
            'author: Richard';

        expect(Header.fromString(h)).toBeInstanceOf(Header);
    })

    it('Should fail to create a header when string is malformed.', () => {
        const malformed = ' - Translation for RRR movie.\n' +
            'language: Dutch\n' +
            'author: Richard';

        expect(() => Header.fromString(malformed)).toThrow(InvalidHeaderError);
        expect(Header.fromString(malformed, false)).toBe(false);
    })
})