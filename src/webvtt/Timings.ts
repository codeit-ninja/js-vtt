import Cue from "./segments/Cue";
import {isArray} from "lodash";
import {toSrtTimingString, toVttTimingString} from "../utils";

type TimingsSettings = {
   startTime?: string;
   endTime?: string;
}

export default class Timings {
    constructor(protected segment: Cue|Cue[]) {}

    /**
     * Shift both `startTime` and `endTime`
     *
     * @param ms
     */
    shift(ms: number) {
        if (ms < 0) {
            return this.run( { startTime: (ms / 1000).toString(), endTime: (ms / 1000).toString() });
        }

        return this.run({ startTime: '+' + (ms / 1000).toString(), endTime: '+' + (ms / 1000).toString() });
    }

    /**
     * Shift `startTime` only
     *
     * @param ms    - milliseconds
     */
    shiftStart(ms: number) {
        if (ms < 0) {
            return this.run( { startTime: (ms / 1000).toString() });
        }

        return this.run({ startTime: '+' + (ms / 1000).toString() });
    }

    /**
     * Shift `endTime` only
     *
     * @param ms    - milliseconds
     */
    shiftEnd(ms: number) {
        if (ms < 0) {
            return this.run( { endTime: (ms / 1000).toString() });
        }

        return this.run({  endTime: '+' + (ms / 1000).toString() });
    }

    /**
     * Resynchronizes subtitles which were created for 'x' frames per second
     * into the desired 'x' frames per second.
     *
     * @param sourceFps
     * @param targetFps
     */
    resync(sourceFps: number, targetFps: number) {
        this.run({
            startTime: '*' + (sourceFps / targetFps).toString(),
            endTime: '*' + (sourceFps / targetFps).toString()
        });
    }

    /**
     * Convert timings to `string`
     *
     * @param format  - Default is `vtt`
     */
    toString(format?: 'vtt'|'srt') {
        if ( isArray(this.segment) ) {
            return this.segment.map(s => format?.toLowerCase() === 'srt'
                ? toSrtTimingString(s.startTime, s.endTime)
                : toVttTimingString(s.startTime, s.endTime)
            );
        }

        return format?.toLowerCase() === 'srt'
            ? toSrtTimingString(this.segment.startTime, this.segment.endTime)
            : toVttTimingString(this.segment.startTime, this.segment.endTime);
    }

    /**
     * Update timings for a single `Cue`
     *
     * @param timings
     * @param segment
     * @protected
     */
    protected update(timings: TimingsSettings, segment: Cue) {
        if ( ! timings.startTime && ! timings.endTime ) {
            return this.segment;
        }

        if ( timings.startTime ) {
            segment.setStartTime(eval(segment.startTime + timings.startTime));
        }

        if ( timings.endTime ) {
            segment.setEndTime(eval(segment.endTime + timings.endTime));
        }

        return segment;
    }

    /**
     * Update timings for an `array` of `cues`
     *
     * @param timings
     * @param segments
     * @protected
     */
    protected updateAll(timings: TimingsSettings, segments: Cue[]) {
        segments.forEach(s => this.update.call(null, timings, s));

        return segments;
    }

    /**
     * Internal function which invokes `update` or `updateAll` based on input
     * So you don't have to perform checks each time to determine
     * what input is given (array of cues or a single cue).
     *
     * @param timings
     * @protected
     */
    protected run(timings: TimingsSettings) {
        if ( isArray(this.segment) ) {
            return this.updateAll(timings, this.segment);
        }

        return this.update(timings, this.segment);
    }
}