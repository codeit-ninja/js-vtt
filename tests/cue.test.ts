import { describe, it, beforeEach, expect } from 'vitest'

import Cue from '../src/webvtt/segments/Cue';
import InvalidCueError from "../src/errors/InvalidCueError";

describe('Cue', () => {
    let cue: Cue;

    beforeEach(() => {
        cue = new Cue(0.244, 3.522, 'John doe is a fake person.', 'Test ID', {
            vertical: 'rl',
            line: 5,
            position: '30%',
            size: '15%',
            align: 'start'
        })
    });

    it('Can strip HTML tags from text.', () => {
        const expected = 'This text has a lot of tags which should be removed.';
        const cue = new Cue(0.244, 3.522, 'This <i>text</i> has a lot of <b>tags<b> which should be <c.class>removed</c>.');

        expect(cue.removeTags().text).toBe(expected);
    })

    it('Has properties.', () => {
        const expected = {
            identifier: 'Test ID',
            startTime: 0.244,
            endTime: 3.522,
            text: expect.any(String),
            settings: expect.objectContaining({
                vertical: 'rl',
                line: 5,
                position: '30%',
                size: '15%',
                align: 'start'
            })
        }

        expect(cue).toMatchObject(expected);
    })

    it('Can set cue settings.', () => {
        const settings = cue
            .line(10)
            .vertical('lr')
            .position('15%')
            .size('12%')
            .align('end');

        const expected = {
            line: 10,
            vertical: 'lr',
            position: '15%',
            size: '12%',
            align: 'end'
        }

        expect(settings.settings).toEqual(expected);
    })

    it('Can update properties.', () => {
        cue
            .setIdentifier('Another ID')
            .setText('Hello world')
            .setStartTime(4.225)
            .setEndTime(6.522)

        const expected = {
            identifier: 'Another ID',
            startTime: 4.225,
            endTime: 6.522,
            text: expect.any(String)
        }

        expect(cue).toMatchObject(expected);
    })

    it('Can generate a valid WebVTT string format.', () => {
        const expected = 'Test ID\n' +
            '00:00:00.244 --> 00:00:03.522\n' +
            'John doe is a fake person.';

        expect(cue.toString()).toEqual(expected);
    })

    it('Can generate a valid SRT string format.', () => {
        const expected = '1\n' +
            '00:00:00,244 --> 00:00:03,522\n' +
            'John doe is a fake person.';

        cue.setIdentifier(1);

        expect(cue.toString('srt')).toEqual(expected);
    })

    it('Should throw an error when the identifier is not numeric when format is SRT.', () => {
        expect(() => cue.toString('srt')).toThrow(InvalidCueError);
    })

    it('Can clone cue.', () => {
        const expected = {
            identifier: 'Test ID',
            startTime: 0.244,
            endTime: 3.522,
            text: expect.any(String)
        }

        expect(cue.clone()).toMatchObject(expected)
    })

    it('Can create instance from string.', () => {
        const string = '14\n' +
            '00:01:14.815 --> 00:01:18.114\n' +
            '- What?\n' +
            '- Where are we now?';

        expect(Cue.fromString(string)).toMatchObject({
            identifier: '14',
            startTime: 74.815,
            endTime: 78.114,
            text: '- What?\n- Where are we now?'
        })
    })

    it('Should throw an error or return false when creating instance from malformed string.', () => {
        const timingStringMalformed_1 = '14\n' +
            '00:01:14.815 ---> 00:01:18.114\n' +
            '- What?\n' +
            '- Where are we now?';
        const timingStringMalformed_2 = '14\n' +
            '- What?\n' +
            '- Where are we now?';

        expect(() => Cue.fromString(timingStringMalformed_1)).toThrow(InvalidCueError);
        expect(() => Cue.fromString(timingStringMalformed_2)).toThrow(InvalidCueError);

        // or false when disabling errors
        expect(Cue.fromString(timingStringMalformed_1, false)).toBe(false);
        expect(Cue.fromString(timingStringMalformed_2, false)).toBe(false);

        const textStringMalformed_1 = '14\n' +
            '00:01:14.815 --> 00:01:18.114\n';

        expect(() => Cue.fromString(textStringMalformed_1)).toThrow(InvalidCueError);

        // or false when disabling errors
        expect(Cue.fromString(textStringMalformed_1, false)).toBe(false);
    })
})