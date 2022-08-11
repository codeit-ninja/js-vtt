export default class Text<T extends string = ''> {
    private _text;
    constructor(_text: T);
    class(...classes: string[]): string;
    italics<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring : never): this;
    bold<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring : never): this;
    underline<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring : T): this;
    voice<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring : never, name: string): this;
    removeTags(): this;
    get text(): T;
    toString(format?: 'vtt' | 'srt'): T;
}
