import Cue from "./webvtt/segments/Cue";
import Segment from "./webvtt/segments/Segment";
import Comment from "./webvtt/segments/Comment";
import {createSegments, isVtt} from "./utils";
import Header from "./webvtt/segments/Header";
import Timings from "./webvtt/Timings";
import Style from "./webvtt/segments/Style";
import InvalidVttError from "./errors/InvalidVttError";

export default class VTT<Meta extends Record<string, any>> {
    protected _segments: Segment[] = [];

    protected _header: Header<Meta>;

    constructor( description?: string, meta?: Meta ) {
        this._header = new Header<Meta>(description, meta);
        this._segments.push(this._header);
    }

    addSegment(segment: Segment) {
        /**
         * Cannot add a header segment, only 1 header segment can be present.
         * The header is already created when a new `VTT` instance is created.
         */
        if ( segment instanceof Header ) {
            return;
        }

        this._segments.push(segment);
    }

    addCue<T extends string>(startTime: number, endTime: number, text: T) {
        const cue = new Cue<T>(startTime, endTime, text);

        this._segments.push(cue);

        return cue;
    }

    addComment( cmnt: string|string[] ) {
        const comment = new Comment(cmnt);

        this._segments.push(comment);

        return comment;
    }

    removeTags() {
        for(const segment of this._segments) {
            if( segment instanceof Cue ) segment.removeTags();
        }

        return this;
    }

    removeComments() {
        this._segments = this._segments.filter(s => ! ( s instanceof Comment ) );

        return this;
    }

    toString(format?: 'vtt'|'srt') {
        if (format === 'srt') {
            let i = 1;

            return this.segments
                .map(segment => {
                    /**
                     * In an SRT file the identifier is mandatory,
                     * and it can only be a number, not a string.
                     */
                    if (segment instanceof Cue) {
                        return segment
                            .setIdentifier(i++)
                            .toString(format);
                    }

                    return null;
                })
                .filter(s => s)
                .join('\n\n');
        }

        return this.segments.map(segment => segment.toString()).join('\n\n');
    }

    public get timings() {
        return new Timings(this.cues);
    }

    public get segments() {
        return this._segments;
    }

    public get header() {
        return this._header;
    }

    public get cues() {
        return this._segments.filter(s => s instanceof Cue) as Cue[];
    }

    public get comments() {
        return this._segments.filter(s => s instanceof Comment) as Comment[];
    }

    public get styles() {
        return this._segments.filter(s => s instanceof Style) as Style[];
    }

    /**
     * Create VTT instance from string
     *
     * @param str
     * @param error
     * @throws {InvalidVttError}
     */
    public static fromString(str: string, error?: true): VTT<{}>;
    public static fromString(str: string, error?: true): VTT<{}>;
    public static fromString(str: string, error?: false): false|VTT<{}>;
    public static fromString<Meta extends Record<string, any> = {}>( str: string, error = true ) {
        if ( ! isVtt(str) ) {
            if ( ! error ) {
                return false;
            }

            throw new InvalidVttError('Is not a valid WebVTT format.\n\nThe structure of a WebVTT consists of the following components, some of them optional, in this order:\n\n- An optional byte order mark (BOM).\n- The string "WEBVTT".\n', str);
        }

        const segments = createSegments(str.split('\n\n'));
        const header = segments.find(s => s instanceof Header) as Header<Meta>;

        const vtt = new VTT(header?.description, header?.meta);

        segments.forEach(vtt.addSegment.bind(vtt));

        return vtt;
    }
}