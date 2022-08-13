import Segment from "./Segment";
import InvalidCueError from "../../errors/InvalidCueError";
import {getCue, stripTags} from "../../utils";
import Timings from "../Timings";
import {isString} from "lodash-es";

export type CueSettings = {
    vertical?: 'rl'|'lr';
    line?: number|string;
    position?: string;
    size?: string;
    align?: 'start'|'center'|'end';
}

export default class Cue<T extends CueSettings = {}> extends Segment {
    /**
     * @protected
     */
    protected _startTime: number;
    /**
     * @protected
     */
    protected _endTime: number;
    /**
     * @protected
     */
    protected _text: string;
    /**
     * @protected
     */
    protected _identifier?: string|number;
    /**
     * @protected
     */
    protected _settings: CueSettings;

    /**
     * Construct a new Cue object
     *
     * @param startTime
     * @param endTime
     * @param text
     * @param identifier
     * @param settings
     */
    constructor( startTime: number, endTime: number, text: string, identifier?: string|number, settings?: T ) {
        super();

        this._startTime = startTime;
        this._endTime = endTime;
        this._text = text;
        this._identifier = identifier;
        this._settings = settings || {};
    }

    /**
     * Indicates that the text will be displayed vertically
     * rather than horizontally, such as in some Asian languages.
     *
     * Indicates that the text will be displayed vertically rather
     * than horizontally, such as in some Asian languages.
     *
     * @param direction
     */
    vertical(direction: 'lr'|'rl') {
        this._settings.vertical = direction;

        return this;
    }

    /**
     * Specifies where text appears vertically.
     * If vertical is set, line specifies where text appears horizontally.
     *
     * **Value can be a line number.**
     * - The line height is the height of the first line of the cue as it appears on the video.
     * - Positive numbers indicate top down.
     * - Negative numbers indicate bottom up.
     *
     * **Or value can be a percentage.**
     * - Must be an integer (i.e., no decimals) between 0 and 100 inclusive.
     * - Must be followed by a percent sign (%).
     *
     * @param value     - number or percentage
     */
    line(value: string|number) {
        this._settings.line = value;

        return this;
    }

    /**
     * Specifies where the text will appear horizontally.
     * If vertical is set, position specifies where the text will appear vertically.
     *
     * **Value is a percentage.**
     * - Must be an integer (no decimals) between 0 and 100 inclusive.
     * - Must be followed by a percent sign (%).
     *
     * @param value     - percentage
     */
    position(value: string) {
        this._settings.position = value;

        return this;
    }

    /**
     * Specifies the width of the text area. If vertical is set,
     * size specifies the height of the text area.
     *
     * **Value is a percentage.**
     * - Must be an integer (no decimals) between 0 and 100 inclusive.
     * - Must be followed by a percent sign (%).
     *
     * @param value
     */
    size(value: string) {
        this._settings.size = value;

        return this;
    }

    /**
     * Specifies the alignment of the text. Text is aligned within
     * the space given by the size cue setting if it is set.
     *
     * @param value
     */
    align(value: 'start'|'center'|'end') {
        this._settings.align = value;

        return this;
    }

    /**
     * Strips all specials tags from the text payload.
     */
    removeTags() {
        this._text = stripTags(this.text);

        return this;
    }

    /**
     * Converts current state of the object into
     * a string representing a *vtt* or *srt* cue
     *
     * @param format
     */
    toString(format?: 'vtt'|'srt') {
        if (format === 'srt') {
            if ( ! this._identifier || isString(this._identifier) ) {
                throw new InvalidCueError('SRT files must have an identifier, the identifier should represent a numeric counter', `${this._identifier}\n${this.timings.toString(format)}\n${this._text}`);
            }

            /**
             * Removes text formatting
             */
            this.removeTags();

            return `${this._identifier}\n${this.timings.toString(format)}\n${this.text}`
        }

        return `${this._identifier !== undefined ? this._identifier + '\n' : ''}${this.timings.toString()}\n${this._text}`
    }

    /**
     * Clones current Cue.
     */
    clone() {
        return new Cue(this._startTime, this._endTime, this._text.toString(), this._identifier);
    }

    /**
     * Set start time
     *
     * @param seconds
     */
    setStartTime(seconds: number) {
        this._startTime = seconds;

        return this;
    }

    /**
     * Set end time
     *
     * @param seconds
     */
    setEndTime(seconds: number) {
        this._endTime = seconds;

        return this;
    }

    /**
     * Set text payload
     *
     * @param text
     */
    setText(text: string) {
        this._text = text;

        return this;
    }

    /**
     * Sets JSON object as text payload
     * 
     * @param meta 
     * @returns 
     * 
     * @link http://wiki.webmproject.org/webm-metadata/temporal-metadata/webvtt-metadata
     */
    setMeta(meta: object) {
        this._text = JSON.stringify(meta, null, 4);

        return this;
    }

    /**
     * The identifier is a name that identifies the cue.
     * It can be used to reference the cue from a script.
     *
     * In a *srt* file this is mandatory in a *WebVTT* file an identifier is optional
     *
     * @param identifier
     */
    setIdentifier(identifier: string|number) {
        this._identifier = identifier;

        return this;
    }

    public get startTime() {
        return this._startTime;
    }

    public get endTime() {
        return this._endTime;
    }

    public get text() {
        return this._text;
    }

    public get identifier() {
        return this._identifier;
    }

    public get settings() {
        return this._settings;
    }

    public get timings(): Omit<Timings, 'resync'> {
        return new Timings(this);
    }

    /**
     * *Example cue*
     * ```txt
     * 1
     * 00:00:01.000 --> 00:00:05.000
     * - Here's what I love most
     * about <i>food</i> and <i>diet</i>.
     * ```
     *
     * @param str       - See example
     * @param error     - If false, method will not throw an error
     * @throws {InvalidCueError}
     */
    public static fromString(str: string, error = true) {
        const cue = getCue(str);

        if ( ! cue ) {
            if ( ! error ) {
                return false;
            }

            throw new InvalidCueError(`
Cue seems malformed, make sure the cue is in a valid format.
            
Expected:
id?
hh:mm:ss.ms --> hh:mm:ss.ms
text_payload
            
            `, str);
        }

        return new Cue(cue.startTime, cue.endTime, cue.text, cue.identifier);
    }
}