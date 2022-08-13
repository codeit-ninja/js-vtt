import Cue from "./webvtt/segments/Cue";
import Segment from "./webvtt/segments/Segment";
import Comment from "./webvtt/segments/Comment";
import Header from "./webvtt/segments/Header";
import Timings from "./webvtt/Timings";
import Style from "./webvtt/segments/Style";
export default class VTT<Meta extends Record<string, any>> {
    protected _segments: Segment[];
    protected _header: Header<Meta>;
    constructor(description?: string, meta?: Meta);
    /**
     * Add segment.
     * - `Cue`
     * - `Comment`
     * - `Style`
     *
     * Or create your own segment, custom segments must extend base `Segment` class.
     *
     * @param segment
     * @public
     */
    addSegment(segment: Segment): void;
    /**
     * Add cue segment
     *
     * @param startTime
     * @param endTime
     * @param text
     * @public
     */
    addCue(startTime: number, endTime: number, text: string): Cue<{}>;
    /**
     * Add comment segment
     *
     * @param cmnt
     * @public
     */
    addComment(cmnt: string | string[]): Comment;
    /**
     * Remove all markup from VTT.
     *
     * @public
     */
    removeTags(): this;
    /**
     *
     * Remove all comment segments
     *
     * @public
     */
    removeComments(): this;
    /**
     * Generates VTT or SRT string.
     *
     * @param format
     * @returns
     */
    toString(format?: 'vtt' | 'srt'): string;
    get timings(): Timings;
    get segments(): Segment[];
    get header(): Header<Meta>;
    get cues(): Cue<{}>[];
    get comments(): Comment[];
    get styles(): Style<{}>[];
    /**
     * Create VTT instance from string
     *
     * @param str
     * @param error
     * @throws {InvalidVttError}
     */
    static fromString(str: string, error?: true): VTT<{}>;
    static fromString(str: string, error?: true): VTT<{}>;
    static fromString(str: string, error?: false): false | VTT<{}>;
}
