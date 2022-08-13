import {SEGMENT_COMMENT_REGEX, SEGMENT_CUE_REGEX, SEGMENT_HEADER_REGEX, SEGMENT_STYLE_REGEX, VTT_VALIDATION_REGEX} from "./constants";
import Segment from "./webvtt/segments/Segment";
import Cue, {CueSettings} from "./webvtt/segments/Cue";
import Comment from "./webvtt/segments/Comment";
import Header from "./webvtt/segments/Header";
import VTT from "./vtt";
import {camelCase, fromPairs, isEmpty, toPairs} from "lodash";
import Style from "./webvtt/segments/Style";

export function createSegments( segments: string[] ) {
    const t: Segment[] = [];

    segments.forEach(segment => {
        const header = isHeader(segment) ? Header.fromString(segment, false) : false;
        const cue = isCue(segment) ? Cue.fromString(segment, false) : false;
        const comment = isComment(segment) ? Comment.fromString(segment, false) : false;
        const style = isStyle(segment) ? Style.fromString(segment, false) : false;

        if ( header ) {
            t.push(header);
        }

        if ( cue ) {
            t.push(cue);
        }

        if ( comment ) {
            t.push(comment);
        }

        if ( style ) {
            t.push(style);
        }
    })

    return t;
}

/**
 * Converts a VTT or SRT timing `string`
 * to a `number` in seconds + milliseconds
 *
 * *Example*
 * ```js
 * const seconds = hmsToSeconds('00:00:02.827'); // 2.827
 * ```
 *
 * @param {string} str
 * @returns number
 */
export function hmsToSeconds(str: string) {
    let p = str.split(':'),
        s = 0,
        m = 1;

    while (p.length > 0) {
        s += m * parseFloat(p.pop()!);
        m *= 60;
    }

    return s;
}

/**
 * Converts a number into an HH:MM:SS.MS string
 *
 * *Example*
 * ```js
 * const hms = secondsToHms(3.421); // 00:00:03.421
 * ```
 *
 * @param {number} seconds
 * @returns string
 */
export function secondsToHms(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 12);
}

export function vtt2srt(vtt: string) {
    const webVtt = VTT.fromString(vtt);

    return webVtt
        .removeComments()
        .removeTags()
        .toString('srt')
}

export function srt2vtt(srt: string) {
    return fromSrt(srt).toString();
}

export function fromSrt(srt: string) {
    return VTT.fromString(srt);
}

export const isVtt = (str: string) => VTT_VALIDATION_REGEX.test(str);
export const isHeader = (segment: string) => SEGMENT_HEADER_REGEX.test(segment);
export const isCue = (segment: string) => SEGMENT_CUE_REGEX.test(segment);
export const isComment = (segment: string) => SEGMENT_COMMENT_REGEX.test(segment);
export const isStyle = (segment: string) => SEGMENT_STYLE_REGEX.test(segment);

export const getHeader = (segment: string) => {
    if( ! isHeader(segment) ) {
        return false;
    }

    const { description, meta } = segment.match(SEGMENT_HEADER_REGEX)!.groups!;
    let metaObject: Record<string, any> = {};

    if ( meta ) {
        /**
         * Converts a string from
         *
         * WEBVTT
         * VTTKind: metadata
         * VTTDataFormat: <metadata format>
         * VTTDataHint: <metadata type>
         *
         * Into an object
         * {
         *     VTTKind: "metadata",
         *     VTTDataFormat: "<metadata format>",
         *     VTTDataHint: "<<metadata type>>"
         * }
         */
        metaObject = fromPairs(meta.split('\n').map(m => m.split(':').map(m => m.replace(/^\s/, ''))));
    }

    return {
        description: description,
        meta: isEmpty(metaObject) ? undefined : metaObject
    }
}
export const getCue = (segment: string) => {
    if( ! isCue(segment) ) {
        return false;
    }

    const { identifier, timings, text } = segment.match(SEGMENT_CUE_REGEX)!.groups!;

    const startTime = timings.split(' --> ')[0];
    const endTime = timings.split(' --> ')[1];

    return {
        identifier: identifier,
        startTime: hmsToSeconds(startTime),
        endTime: hmsToSeconds(endTime),
        text: text
    }
}
export const getComment = (segment: string) => {
    if( ! isComment(segment) ) {
        return false;
    }

    const { text } = segment.match(SEGMENT_COMMENT_REGEX)!.groups!;

    return {
        text: text
    }
}
export const getStyle = (segment: string) => {
    if( ! isStyle(segment) ) {
        return false;
    }

    const { styles, selector } = segment.match(SEGMENT_STYLE_REGEX)!.groups!;
    const stylesObject: Partial<CSSStyleDeclaration> = fromPairs(styles.replace(/ {2,}/g, '').split('\n').map(s => {
        const keyValuePair = s.replace(': ', ':').replace(';', '').split(':');

        return [camelCase(keyValuePair[0]), keyValuePair[1]];
    }));

    return {
        styles: stylesObject,
        selector: selector
    }
}

export const toVttTimingString = (startTime: number, endTime: number, cueSettings?: CueSettings) => secondsToHms(startTime) + ' --> ' + secondsToHms(endTime) + (cueSettings ? ' ' + toPairs(cueSettings).map(s => s.join(':')).join(' ') : '');
export const toSrtTimingString = (startTime: number, endTime: number) => toVttTimingString(startTime, endTime).replaceAll('.', ',');
export const stripTags = (str: string) => str.replace(/<\/?[^>]+(>|$)/g, "");
export const createTag = (type: 'b'|'u'|'i'|'v'|'c') => {

}