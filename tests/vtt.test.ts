import { beforeEach, describe, expect, it } from 'vitest';
import InvalidVttError from "../src/errors/InvalidVttError";
import VTT from "../src/vtt";
import Header from "../src/webvtt/segments/Header";
import Timings from "../src/webvtt/Timings";

describe('Test VTT', () => {
    let vtt: VTT<{language: string, author: string}>;

    beforeEach(() => {
        vtt = new VTT('- Test webvtt file', {
            language: 'dutch',
            author: 'Richard'
        });
    })

    it('Should contain properties', () => {
        const expected = {
            timings: expect.any(Timings),
            segments: expect.any(Array),
            header: expect.any(Header),
            cues: expect.any(Array),
            comments: expect.any(Array),
            styles: expect.any(Array)
        }

        expect(vtt).toMatchObject(expected)
    })

    it('Can create instance from string.', () => {
        const expected = {
            timings: expect.any(Timings),
            segments: expect.any(Array),
            header: expect.any(Header),
            cues: expect.any(Array),
            comments: expect.any(Array),
            styles: expect.any(Array)
        }

        const vtt = VTT.fromString('WEBVTT\n' +
            'Language=zh\n' +
            'Kind=Caption\n' +
            'Version=V1_ABC\n' +
            'License=CC-BY-SA\n\n' +
            'STYLE\n' +
            '::cue {\n' +
            '  background-image: linear-gradient(to bottom, dimgray, lightgray);\n' +
            '  color: papayawhip;\n' +
            '}\n' +
            '/* Style blocks cannot use blank lines nor "dash dash greater than" */\n' +
            '\n' +
            'NOTE comment blocks can be used between style blocks.\n' +
            '\n' +
            'STYLE\n' +
            '::cue(b) {\n' +
            '  color: peachpuff;\n' +
            '}\n' +
            '\n' +
            '00:00:00.000 --> 00:00:10.000\n' +
            '- Hello <b>world</b>.\n' +
            '\n' +
            'NOTE style blocks cannot appear after the first cue.');

        expect(vtt).toMatchObject(expected);
    })

    it('Should fail to create an instance from malformed string.', () => {
        const string = 'All WebVTT caption or subtitle cue components bar the HTML character reference may have one or more cue component class names attached to it by separating the cue component class name from the cue component start tag using the period (\'.\') notation. The class name must immediately follow the "period" (.).\n' +
            '\n' +
            'WebVTT cue internal text consists of an optional WebVTT line terminator, followed by zero or more WebVTT caption or subtitle cue components, in any order, each optionally followed by a WebVTT line terminator.\n' +
            '\n' +
            'A WebVTT cue class span consists of a WebVTT cue span start tag "c" that disallows an annotation, WebVTT cue internal text representing cue text, and a WebVTT cue span end tag "c".';

        expect(() => VTT.fromString(string)).toThrow(InvalidVttError);
        expect(VTT.fromString(string, false)).toBe(false);
    })

    it('Can add new cues and comments and generate a WebVTT or SRT string.', () => {
        const vtt = new VTT('Translation for movie');

        vtt.addCue(1, 5, '- Here\'s what I love most\nabout <i>food</i> and <i>diet</i>.')
        vtt.addCue(5, 10, 'We all eat several times a day,\nand we\'re totally in charge')
        vtt.addComment(['This translation was done by Kyle so that', 'some friends can watch it with their parents.']);
        vtt.addCue(5, 10, 'We all eat several times a day,\nand we\'re totally in charge');

        const expected_vtt = 'WEBVTT Translation for movie\n' +
            '\n' +
            '00:00:01.000 --> 00:00:05.000\n' +
            '- Here\'s what I love most\n' +
            'about <i>food</i> and <i>diet</i>.\n' +
            '\n' +
            '00:00:05.000 --> 00:00:10.000\n' +
            'We all eat several times a day,\n' +
            'and we\'re totally in charge\n' +
            '\n' +
            'NOTE\n' +
            'This translation was done by Kyle so that\n' +
            'some friends can watch it with their parents.\n' +
            '\n' +
            '00:00:05.000 --> 00:00:10.000\n' +
            'We all eat several times a day,\n' +
            'and we\'re totally in charge';
        const expected_srt = '1\n' +
            '00:00:01,000 --> 00:00:05,000\n' +
            '- Here\'s what I love most\n' +
            'about food and diet.\n' +
            '\n' +
            '2\n' +
            '00:00:05,000 --> 00:00:10,000\n' +
            'We all eat several times a day,\n' +
            'and we\'re totally in charge\n' +
            '\n' +
            '3\n' +
            '00:00:05,000 --> 00:00:10,000\n' +
            'We all eat several times a day,\n' +
            'and we\'re totally in charge';

        expect(vtt.toString()).toBe(expected_vtt);
        expect(vtt.toString('srt')).toBe(expected_srt);
    })

    it('Can remove tags and comments.', () => {
        const vtt = new VTT('Translation for movie');

        vtt.addCue(1, 5, '- Here\'s what I love most\nabout food and diet.')
        vtt.addCue(5, 10, 'We all eat several times a day,\nand we\'re totally in charge')
        vtt.addComment(['This translation was done by Kyle so that', 'some friends can watch it with their parents.']);
        vtt.addCue(5, 10, 'We all eat several times a day,\nand we\'re totally in charge');

        const expected = 'WEBVTT Translation for movie\n' +
            '\n' +
            '00:00:01.000 --> 00:00:05.000\n' +
            '- Here\'s what I love most\n' +
            'about food and diet.\n' +
            '\n' +
            '00:00:05.000 --> 00:00:10.000\n' +
            'We all eat several times a day,\n' +
            'and we\'re totally in charge\n' +
            '\n' +
            '00:00:05.000 --> 00:00:10.000\n' +
            'We all eat several times a day,\n' +
            'and we\'re totally in charge';

        vtt
            .removeTags()
            .removeComments();

        expect(vtt.toString()).toBe(expected);
    })
})