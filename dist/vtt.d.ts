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
    addSegment(segment: Segment): void;
    addCue<T extends string>(startTime: number, endTime: number, text: T): Cue<T, {}>;
    addComment(cmnt: string | string[]): Comment;
    removeTags(): this;
    removeComments(): this;
    toString(format?: 'vtt' | 'srt'): string;
    get timings(): Timings;
    get segments(): Segment[];
    get header(): Header<Meta>;
    get cues(): Cue<string, {}>[];
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
