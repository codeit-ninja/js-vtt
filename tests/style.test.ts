import { describe, it, beforeEach, expect } from 'vitest'

import Style from '../src/webvtt/segments/Style';
import InvalidStyleError from "../src/errors/InvalidStyleError";

describe('Comment', () => {
    let style: Style;

    beforeEach(() => {
        style = new Style({
            backgroundColor: '#ffffff',
            fontSize: '1.1rem'
        }, 'b')
    });

    it('Can create valid WebVTT string format.', () => {
        const expected = 'STYLE\n' +
            '::cue(b) {\n' +
            '\tbackground-color: #ffffff;\n' +
            '\tfont-size: 1.1rem;\n' +
            '}';

        expect(style.toString()).toBe(expected);
    })

    it('Should has public properties `styles` and `selector`.', () => {
        const expected = {
            styles: {
                backgroundColor: '#ffffff',
                fontSize: '1.1rem'
            },
            selector: 'b'
        }

        expect(style).toMatchObject(expected);
    })

    it('Can create instance from string.', () => {
        const string = 'STYLE\n' +
            '::cue(b) {\n' +
            '\tbackground-color: #ffffff;\n' +
            '\tfont-size: 1.1rem;\n' +
            '}';
        const expected = {
            selector: 'b',
            styles: {
                backgroundColor: '#ffffff',
                fontSize: '1.1rem'
            }
        }

        expect(Style.fromString(string)).toMatchObject(expected);
    })

    it('Should fail to create instance from malformed string.', () => {
        const malformed = '\n' +
            '::cue {\n' +
            '\tbackground-color: #ffffff;\n' +
            '\tfont-size: 1.1rem;\n' +
            '}';

        expect(() => Style.fromString(malformed)).toThrow(InvalidStyleError);
        expect(Style.fromString(malformed, false)).toBe(false);
    })
})