import { Segment } from './segment';

export class Header<Meta extends Record<string, string> = Record<string, string>> extends Segment {
    #meta: Meta;
    #description?: string;

    constructor(description?: string, meta?: Meta) {
        super();
        this.#description = description;
        this.#meta = meta || ({} as Meta);
    }

    get description() {
        return this.#description;
    }

    get meta() {
        return this.#meta;
    }

    setMeta(meta: Meta) {
        this.#meta = meta;
    }

    setDescription(description: string) {
        this.#description = description;
    }

    isValid(): boolean {
        // Per spec §4.1: description is on the WEBVTT line and must not contain CR or LF.
        if (this.#description !== undefined && /[\r\n]/.test(this.#description)) {
            return false;
        }

        return true;
    }

    toString(format?: 'vtt' | 'srt'): string {
        if (format === 'srt') {
            return '';
        }

        return (
            'WEBVTT' +
            (this.#description ? ' ' + this.#description : '') +
            (this.#meta && Object.keys(this.#meta).length
                ? '\n' +
                  Object.entries(this.#meta)
                      .map((m) => m.join(': '))
                      .join('\n')
                : '')
        );
    }

    toJSON(): Record<string, any> {
        return {
            description: this.#description,
            meta: this.#meta,
        };
    }

    static fromString(str: string) {
        const { description, meta } = str.match(
            /^WEBVTT ?(?<description>[^\n]+)?\n?(?<meta>(?:.*\n?)*)?/,
        )!.groups!;

        return new Header(
            description,
            meta
                ? Object.fromEntries(
                      meta.split('\n').map((line) => line.split(': ').map((part) => part.trim())),
                  )
                : undefined,
        );
    }
}
