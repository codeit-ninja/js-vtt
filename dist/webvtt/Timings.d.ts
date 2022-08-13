import Cue from "./segments/Cue";
declare type TimingsSettings = {
    startTime?: string;
    endTime?: string;
};
export default class Timings {
    protected segment: Cue | Cue[];
    constructor(segment: Cue | Cue[]);
    /**
     * Shift both `startTime` and `endTime`
     *
     * @param ms
     */
    shift(ms: number): Cue<{}> | Cue<{}>[];
    /**
     * Shift `startTime` only
     *
     * @param ms    - milliseconds
     */
    shiftStart(ms: number): Cue<{}> | Cue<{}>[];
    /**
     * Shift `endTime` only
     *
     * @param ms    - milliseconds
     */
    shiftEnd(ms: number): Cue<{}> | Cue<{}>[];
    /**
     * Resynchronizes subtitles which were created for 'x' frames per second
     * into the desired 'x' frames per second.
     *
     * @param sourceFps
     * @param targetFps
     */
    resync(sourceFps: number, targetFps: number): void;
    /**
     * Convert timings to `string`
     *
     * @param format  - Default is `vtt`
     */
    toString(format?: 'vtt' | 'srt'): string | string[];
    /**
     * Update timings for a single `Cue`
     *
     * @param timings
     * @param segment
     * @protected
     */
    protected update(timings: TimingsSettings, segment: Cue): Cue<{}> | Cue<{}>[];
    /**
     * Update timings for an `array` of `cues`
     *
     * @param timings
     * @param segments
     * @protected
     */
    protected updateAll(timings: TimingsSettings, segments: Cue[]): Cue<{}>[];
    /**
     * Internal function which invokes `update` or `updateAll` based on input
     * So you don't have to perform checks each time to determine
     * what input is given (array of cues or a single cue).
     *
     * @param timings
     * @protected
     */
    protected run(timings: TimingsSettings): Cue<{}> | Cue<{}>[];
}
export {};
