import Segment from "./Segment";
export default class Comment extends Segment {
    protected _comment: string | string[];
    /**
     * Construct a new comment
     *
     * If an array of strings is passed,
     * output will be generated as a multi-line comment.
     *
     * @param {string|string[]} _comment
     */
    constructor(_comment: string | string[]);
    toString(): string;
    /**
     * *Example comment*
     * ```txt
     * NOTE
     * This translation was done by Kyle so that
     * some friends can watch it with their parents.
     * ```
     *
     * @param str       - See example
     * @param error     - If false, method will not throw an error
     *
     * @throws {InvalidCommentError}
     */
    static fromString(str: string, error?: boolean): false | Comment;
}
