import Segment from "./Segment";
export default class Style<T extends Partial<CSSStyleDeclaration> = {}> extends Segment {
    protected _styles?: T | undefined;
    protected _selector?: string | undefined;
    /**
     * Construct a new comment
     *
     * If an array of strings is passed,
     * output will be generated as a multi-line comment.
     *
     * @param _styles
     * @param _selector
     */
    constructor(_styles?: T | undefined, _selector?: string | undefined);
    get styles(): T | undefined;
    get selector(): string | undefined;
    toString(): string;
    static fromString(style: string, error?: boolean): false | Style<Partial<CSSStyleDeclaration>>;
}
