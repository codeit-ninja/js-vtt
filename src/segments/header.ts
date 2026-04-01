import { Segment } from './segment';

export class Header extends Segment {
    _type = 'header' as const;

    #meta: Record<string, string>;
    #description?: string;

    constructor(description?: string, meta?: Record<string, string>) {
        super();
        this.#description = description;
        this.#meta = meta || {};
    }

    get description() {
        return this.#description;
    }

    get meta(): Record<string, string> {
        return this.#meta;
    }

    setMeta(meta: Record<string, string>) {
        this.#meta = meta;
    }

    setDescription(description: string) {
        this.#description = description;
    }

    get valid(): boolean {
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
            _type: this._type,
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
                      meta
                          .split('\n')
                          .filter((line) => line.trim())
                          .map((line) => {
                              const sep = line.indexOf(': ');
                              if (sep === -1) return [line.trim(), ''];
                              return [line.slice(0, sep).trim(), line.slice(sep + 2).trim()];
                          }),
                  )
                : undefined,
        );
    }
}
