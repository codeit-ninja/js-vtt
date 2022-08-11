import Segment from "./webvtt/segments/Segment";
import { CueSettings } from "./webvtt/segments/Cue";
import VTT from "./vtt";
export declare function createSegments(segments: string[]): Segment[];
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
export declare function hmsToSeconds(str: string): number;
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
export declare function secondsToHms(seconds: number): string;
export declare function vtt2srt(vtt: string): string;
export declare function srt2vtt(srt: string): string;
export declare function fromSrt(srt: string): VTT<{}>;
export declare const isVtt: (str: string) => boolean;
export declare const isHeader: (segment: string) => RegExpMatchArray | null;
export declare const isCue: (segment: string) => RegExpMatchArray | null;
export declare const isComment: (segment: string) => RegExpMatchArray | null;
export declare const isStyle: (segment: string) => RegExpMatchArray | null;
export declare const toVttTimingString: (startTime: number, endTime: number, cueSettings?: CueSettings | undefined) => string;
export declare const toSrtTimingString: (startTime: number, endTime: number) => string;
export declare const stripTags: (str: string) => string;
