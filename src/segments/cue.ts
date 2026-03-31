import InvalidCueError from '../errors/InvalidCueError';
import { Segment } from './segment';

export type CueSettings = {
    vertical?: 'rl' | 'lr';
    line?: number | string;
    position?: string;
    size?: string;
    align?: 'start' | 'center' | 'end';
    region?: string;
};

function hmsToSeconds(str: string): number {
    const parts = str.split(':');
    let s = 0;
    let m = 1;
    while (parts.length > 0) {
        s += m * parseFloat(parts.pop()!);
        m *= 60;
    }
    return s;
}

function secondsToHms(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substring(11, 23);
}

const CUE_REGEX =
    /^(?:(?<identifier>(?![\d:]+-->)[^\n]+)\n)?(?<timings>[\d:.,]+\s+-->\s+[\d:.,]+[^\n]*)\n(?<text>[\s\S]+)$/;

export class Cue<T extends CueSettings = CueSettings> extends Segment {
    #startTime: number;
    #endTime: number;
    #text: string;
    #identifier?: string | number;
    #settings: T;
    #regionId?: string;

    constructor(
        startTime: number,
        endTime: number,
        text: string,
        identifier?: string | number,
        settings?: T,
    ) {
        super();
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#text = text;
        this.#identifier = identifier;
        this.#settings = settings ?? ({} as T);
    }

    get regionId() {
        return this.#regionId;
    }

    get startTime() {
        return this.#startTime;
    }

    get endTime() {
        return this.#endTime;
    }

    get text() {
        return this.#text;
    }

    get identifier() {
        return this.#identifier;
    }

    get settings() {
        return this.#settings;
    }

    setStartTime(seconds: number): this {
        this.#startTime = seconds;
        return this;
    }

    setEndTime(seconds: number): this {
        this.#endTime = seconds;
        return this;
    }

    setText(text: string): this {
        this.#text = text;
        return this;
    }

    setIdentifier(identifier: string | number): this {
        this.#identifier = identifier;
        return this;
    }

    setSettings(settings: T): this {
        this.#settings = settings;
        return this;
    }

    removeTags(): this {
        this.#text = this.#text.replace(/<\/?[^>]+(>|$)/g, '');
        return this;
    }

    isValid(): boolean {
        // Per spec §4.1: endTime must be greater than startTime, both non-negative.
        if (this.#startTime < 0 || this.#endTime <= this.#startTime) return false;
        // Per spec §4.1: cue payload must not contain '-->'.
        if (this.#text.includes('-->')) return false;
        // Per spec §4.1: cue identifier must not contain '-->', LF, or CR.
        if (this.#identifier !== undefined) {
            const id = String(this.#identifier);
            if (id.includes('-->') || /[\r\n]/.test(id)) return false;
        }
        return true;
    }

    #timingString(format?: 'vtt' | 'srt'): string {
        const start = secondsToHms(this.#startTime);
        const end = secondsToHms(this.#endTime);
        const settingsStr = Object.entries(this.#settings)
            .map(([k, v]) => `${k}:${v}`)
            .join(' ');
        const timing = `${start} --> ${end}${settingsStr ? ' ' + settingsStr : ''}`;
        return format === 'srt' ? timing.replaceAll('.', ',') : timing;
    }

    toString(format?: 'vtt' | 'srt', index?: number): string {
        if (format === 'srt') {
            const text = this.#text.replace(/<\/?[^>]+(>|$)/g, '');
            return `${index}\n${this.#timingString(format)}\n${text}`;
        }

        return (
            (this.#identifier !== undefined ? `${this.#identifier}\n` : '') +
            `${this.#timingString(format)}\n${this.#text}`
        );
    }

    toJSON(): Record<string, any> {
        return {
            identifier: this.#identifier,
            startTime: this.#startTime,
            endTime: this.#endTime,
            text: this.#text,
            settings: this.#settings,
        };
    }

    static fromString(str: string): Cue {
        const match = str.match(CUE_REGEX);

        if (!match) {
            throw new InvalidCueError('Invalid cue segment', str);
        }

        const { identifier, timings, text } = match.groups!;
        const arrowIdx = timings.indexOf('-->');
        const startRaw = timings.slice(0, arrowIdx).trim();
        const afterArrow = timings.slice(arrowIdx + 3).trim();
        const [endRaw, ...settingParts] = afterArrow.split(/\s+/);

        const settings: CueSettings = {};
        for (const part of settingParts) {
            const colonIdx = part.indexOf(':');
            if (colonIdx === -1) continue;
            const key = part.slice(0, colonIdx) as keyof CueSettings;
            const value = part.slice(colonIdx + 1);
            (settings as Record<string, string | number>)[key] = value;
        }

        return new Cue(
            hmsToSeconds(startRaw),
            hmsToSeconds(endRaw),
            text.trim(),
            identifier?.trim(),
            settings,
        );
    }
}
