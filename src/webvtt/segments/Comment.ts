import Segment from "./Segment";
import InvalidCommentError from "../../errors/InvalidCommentError";
import { isComment } from "../../utils";
import { escape } from 'lodash';

export default class Comment extends Segment {
    /**
     * Construct a new comment
     *
     * If an array of strings is passed,
     * output will be generated as a multi-line comment.
     *
     * @param {string|string[]} _comment
     */
    constructor( protected _comment: string|string[] ) {
        super();
    }

    public toString() {
        if ( this._comment instanceof Array ) {
            return 'NOTE\n' + this._comment.join('\n');
        }

        return 'NOTE\n' + escape(this._comment);
    }

    /**
     * *Example comment*
     * ```txt
     * NOTE
     * This translation was done by Kyle so that
     * some friends can watch it with their parents.
     * ```
     *
     * @param comment       - See example
     * @param error     - If false, method will not throw an error
     *
     * @throws {InvalidCommentError}
     */
    public static fromString(comment: string, error = true) {
        const isValidComment = isComment(comment);

        if ( ! isValidComment ) {
            if ( ! error ) {
                return false;
            }

            throw new InvalidCommentError('Does not appear to be a valid comment.', comment);
        }

        return new Comment(isValidComment.groups!.text);
    }
}