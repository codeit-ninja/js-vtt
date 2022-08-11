import Segment from "./Segment";
export default class Header<Meta extends Record<string, any>> extends Segment {
    protected _description?: string | undefined;
    protected _meta?: Meta | undefined;
    /**
     * Construct a new comment
     *
     * If an array of strings is passed,
     * output will be generated as a multi-line comment.
     *
     * @param {string|string[]} _description
     * @param {object} _meta
     */
    constructor(_description?: string | undefined, _meta?: Meta | undefined);
    get description(): string | undefined;
    get meta(): Meta | undefined;
    setDescription(description: string): void;
    setMeta<Meta extends Record<string, any>>(meta: Meta): Meta;
    toString(): string;
    static fromString(header: string, error?: boolean): false | Header<Record<string, any>>;
}
