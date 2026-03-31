export abstract class Segment {
    abstract toString(format?: 'vtt' | 'srt', index?: number): string;
    abstract toJSON(): Record<string, any>;
    abstract isValid(): boolean;

    fromString(): Segment {
        throw new Error('Method not implemented.');
    }
}
