import InvalidRegionError from '../errors/InvalidRegionError';
import { isRegion } from '../helpers';
import { Segment } from './segment';

/**
 * A percentage value in the range [0, 100].
 * Per the WebVTT spec, region anchor and viewport anchor are expressed as
 * "x%,y%" pairs where each component is a non-negative percentage.
 */
export type RegionAnchor = [number, number];

export class Region extends Segment {
    #id?: string;
    #width?: number;
    #lines?: number;
    #regionAnchor?: RegionAnchor;
    #viewportAnchor?: RegionAnchor;
    #scroll?: 'up';

    constructor(
        id?: string,
        width?: number,
        lines?: number,
        regionAnchor?: RegionAnchor,
        viewportAnchor?: RegionAnchor,
        scroll?: 'up',
    ) {
        super();
        this.#id = id;
        this.#width = width;
        this.#lines = lines;
        this.#regionAnchor = regionAnchor;
        this.#viewportAnchor = viewportAnchor;
        this.#scroll = scroll;
    }

    get id() {
        return this.#id;
    }

    get width() {
        return this.#width;
    }

    get lines() {
        return this.#lines;
    }

    get regionAnchor() {
        return this.#regionAnchor;
    }

    get viewportAnchor() {
        return this.#viewportAnchor;
    }

    get scroll() {
        return this.#scroll;
    }

    setId(id: string): this {
        this.#id = id;
        return this;
    }

    /** @param width - percentage as a number, e.g. 40 for "40%" */
    setWidth(width: number): this {
        this.#width = width;
        return this;
    }

    setLines(lines: number): this {
        this.#lines = lines;
        return this;
    }

    setRegionAnchor(anchor: RegionAnchor): this {
        this.#regionAnchor = anchor;
        return this;
    }

    setViewportAnchor(anchor: RegionAnchor): this {
        this.#viewportAnchor = anchor;
        return this;
    }

    setScroll(scroll: 'up'): this {
        this.#scroll = scroll;
        return this;
    }

    toString(format?: 'vtt' | 'srt'): string {
        if (format === 'srt') {
            return '';
        }

        const lines: string[] = ['REGION'];

        if (this.#id !== undefined) {
            lines.push(`id:${this.#id}`);
        }

        if (this.#width !== undefined) {
            lines.push(`width:${this.#width}%`);
        }

        if (this.#lines !== undefined) {
            lines.push(`lines:${this.#lines}`);
        }

        if (this.#regionAnchor !== undefined) {
            lines.push(`regionanchor:${this.#regionAnchor[0]}%,${this.#regionAnchor[1]}%`);
        }

        if (this.#viewportAnchor !== undefined) {
            lines.push(`viewportanchor:${this.#viewportAnchor[0]}%,${this.#viewportAnchor[1]}%`);
        }

        if (this.#scroll !== undefined) {
            lines.push(`scroll:${this.#scroll}`);
        }

        return lines.join('\n');
    }

    toJSON(): Record<string, any> {
        return {
            id: this.#id,
            width: this.#width,
            lines: this.#lines,
            regionAnchor: this.#regionAnchor,
            viewportAnchor: this.#viewportAnchor,
            scroll: this.#scroll,
        };
    }

    isValid(): boolean {
        // Per spec §3.4: id must not contain ASCII whitespace or '-->'.
        if (this.#id !== undefined && (/[\t\n\r ]/.test(this.#id) || this.#id.includes('-->'))) {
            return false;
        }

        // Per spec §4.3: width is a WebVTT percentage — must be in [0, 100].
        if (this.#width !== undefined && (this.#width < 0 || this.#width > 100)) {
            return false;
        }

        // Per spec §4.3: lines is a non-negative integer.
        if (this.#lines !== undefined && (!Number.isInteger(this.#lines) || this.#lines < 0)) {
            return false;
        }

        // Per spec §4.3: regionanchor and viewportanchor are [0,100]% pairs.
        if (this.#regionAnchor !== undefined) {
            const [x, y] = this.#regionAnchor;
            if (x < 0 || x > 100 || y < 0 || y > 100) {
                return false;
            }
        }

        if (this.#viewportAnchor !== undefined) {
            const [x, y] = this.#viewportAnchor;
            if (x < 0 || x > 100 || y < 0 || y > 100) {
                return false;
            }
        }

        return true;
    }

    /**
     * Parse a REGION block per the WebVTT spec.
     *
     * Example:
     * ```
     * REGION
     * id:fred
     * width:40%
     * lines:3
     * regionanchor:0%,100%
     * viewportanchor:10%,90%
     * scroll:up
     * ```
     */
    static fromString(str: string): Region {
        if (!isRegion(str)) {
            throw new InvalidRegionError('Invalid region segment', str);
        }

        const parseAnchor = (raw: string): RegionAnchor => {
            const [x, y] = raw.split(',').map((v) => parseFloat(v));
            return [x, y];
        };

        let id: string | undefined;
        let width: number | undefined;
        let lines: number | undefined;
        let regionAnchor: RegionAnchor | undefined;
        let viewportAnchor: RegionAnchor | undefined;
        let scroll: 'up' | undefined;

        for (const line of str.split('\n').slice(1)) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const colonIdx = trimmed.indexOf(':');
            if (colonIdx === -1) continue;

            const key = trimmed.slice(0, colonIdx);
            const value = trimmed.slice(colonIdx + 1);

            switch (key) {
                case 'id':
                    id = value;
                    break;
                case 'width': {
                    const n = parseFloat(value);
                    if (!isNaN(n)) width = n;
                    break;
                }
                case 'lines': {
                    const n = parseInt(value, 10);
                    if (!isNaN(n)) lines = n;
                    break;
                }
                case 'regionanchor':
                    regionAnchor = parseAnchor(value);
                    break;
                case 'viewportanchor':
                    viewportAnchor = parseAnchor(value);
                    break;
                case 'scroll':
                    if (value === 'up') scroll = 'up';
                    break;
            }
        }

        return new Region(id, width, lines, regionAnchor, viewportAnchor, scroll);
    }
}
