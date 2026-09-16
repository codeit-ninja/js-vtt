import type { Comment } from './comment.js';
import type { Cue } from './cue.js';
import type { Header } from './header.js';
import type { Region } from './region.js';
import type { Style } from './style.js';

export type SegmentType = 'cue' | 'region' | 'style' | 'header' | 'comment';
export type SegmentTypeMap = {
    cue: Cue;
    region: Region;
    style: Style;
    header: Header;
    comment: Comment;
};

export abstract class Segment {
    abstract _type: SegmentType;
    abstract toString(format?: 'vtt' | 'srt', index?: number): string;
    abstract toJSON(): Record<string, any>;
    abstract get valid(): boolean;

    isValid(): boolean {
        return this.valid;
    }

    fromString(): Segment {
        throw new Error('Method not implemented.');
    }
}
