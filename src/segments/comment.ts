import InvalidCommentError from '../errors/InvalidCommentError';
import { isNote } from '../helpers';
import { Segment } from './segment';

export class Comment extends Segment {
    _type = 'comment' as const;

    #text: string;

    constructor(text: string) {
        super();
        this.#text = text;
    }

    get text() {
        return this.#text;
    }

    setText(text: string): this {
        this.#text = text;
        return this;
    }

    toString(format?: 'vtt' | 'srt'): string {
        if (format === 'srt') {
            return '';
        }

        return this.#text ? `NOTE\n${this.#text}` : 'NOTE';
    }

    toJSON(): Record<string, any> {
        return {
            _type: this._type,
            text: this.#text,
        };
    }

    get valid(): boolean {
        // Per spec §4.1: comment block content must not contain '-->'.
        return !this.#text.includes('-->');
    }

    /**
     * Parse a NOTE block per the WebVTT spec.
     *
     * Examples:
     * ```
     * NOTE
     * This is a comment.
     * ```
     * ```
     * NOTE This is an inline comment.
     * ```
     */
    static fromString(str: string): Comment {
        if (!isNote(str)) {
            throw new InvalidCommentError('Invalid comment segment', str);
        }

        // Inline form: "NOTE text" — text starts on the same line after "NOTE "
        // Block form:  "NOTE\ntext…"
        const inlineMatch = str.match(/^NOTE ([^\n]+)/);
        if (inlineMatch) {
            return new Comment(inlineMatch[1]);
        }

        const blockMatch = str.match(/^NOTE\n([\s\S]*)$/);
        return new Comment(blockMatch ? blockMatch[1].trim() : '');
    }
}
