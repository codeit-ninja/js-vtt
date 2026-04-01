import { Cue } from './cue';
import { Header } from './header';
import { Region } from './region';
import { Style } from './style';

export type SegementType = 'cue' | 'region' | 'style' | 'header' | 'comment';
export type SegmentTypeMap = {
    cue: Cue;
    region: Region;
    style: Style;
    header: Header;
    comment: Comment;
};

export abstract class Segment {
    abstract _type: SegementType;
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
