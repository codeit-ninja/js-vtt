import Text from "../Text";
import Segment from "./Segment";
import Timings from "../Timings";
export declare type CueSettings = {
    vertical?: 'rl' | 'lr';
    line?: number | string;
    position?: string;
    size?: string;
    align?: 'start' | 'center' | 'end';
};
export default class Cue<T extends string = string, K extends CueSettings = {}> extends Segment {
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
    protected _text: Text<T>;
    /**
     * @protected
     */
    protected _identifier?: string | number;
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
    constructor(startTime: number, endTime: number, text: T, identifier?: string | number, settings?: K);
    /**
     * Indicates that the text will be displayed vertically
     * rather than horizontally, such as in some Asian languages.
     *
     * Indicates that the text will be displayed vertically rather
     * than horizontally, such as in some Asian languages.
     *
     * @param direction
     */
    vertical(direction: 'lr' | 'rl'): this;
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
    line(value: string | number): this;
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
    position(value: string): this;
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
    size(value: string): this;
    /**
     * Specifies the alignment of the text. Text is aligned within
     * the space given by the size cue setting if it is set.
     *
     * @param value
     */
    align(value: 'start' | 'center' | 'end'): this;
    /**
     * Strips all specials tags from the text payload.
     */
    removeTags(): this;
    /**
     * Converts current state of the object into
     * a string representing a *vtt* or *srt* cue
     *
     * @param format
     */
    toString(format?: 'vtt' | 'srt'): string;
    /**
     * Clones current Cue.
     */
    clone(): Cue<T, {}>;
    /**
     * Set start time
     *
     * @param seconds
     */
    setStartTime(seconds: number): this;
    /**
     * Set end time
     *
     * @param seconds
     */
    setEndTime(seconds: number): this;
    /**
     * Set text payload
     *
     * @param text
     */
    setText(text: T): this;
    /**
     * The identifier is a name that identifies the cue.
     * It can be used to reference the cue from a script.
     *
     * In a *srt* file this is mandatory in a *WebVTT* file an identifier is optional
     *
     * @param identifier
     */
    setIdentifier(identifier: string | number): this;
    get startTime(): number;
    get endTime(): number;
    get text(): Text<T>;
    get identifier(): string | number | undefined;
    get settings(): CueSettings;
    get timings(): Omit<Timings, 'resync'>;
    /**
     * *Example cue*
     * ```txt
     * 1
     * 00:00:01.000 --> 00:00:05.000
     * - Here's what I love most
     * about <i>food</i> and <i>diet</i>.
     * ```
     *
     * @param cue       - See example
     * @param error     - If false, method will not throw an error
     * @throws {InvalidCueError}
     */
    static fromString(cue: string, error?: boolean): false | Cue<string, {}>;
}
