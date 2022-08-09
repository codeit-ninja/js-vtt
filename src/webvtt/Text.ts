import {stripTags} from "../utils";

export default class Text<T extends string = ''> {
    constructor( private _text: T ) {}

    class( ...classes: string[] ) {
        return `<c${classes.join('.')}>${this._text}</c>`;
    }

    italics<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring: never) {
        if ( new RegExp(`<i>${text}</i>`).test(this._text) ) {
            // @ts-ignore
            this._text = this._text.replace(`<i>${text}</i>`, text);
        }

        // @ts-ignore
        this._text = this._text.replace(text, `<i>${text}</i>`);

        return this;
    }

    bold<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring: never) {
        if ( new RegExp(`<b>${text}</b>`).test(this._text) ) {
            // @ts-ignore
            this._text = this._text.replace(`<b>${text}</b>`, text);
        }

        // @ts-ignore
        this._text = this._text.replace(text, `<b>${text}</b>`);

        return this;
    }

    underline<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring: T) {
        if ( new RegExp(`<u>${text}</u>`).test(this._text) ) {
            // @ts-ignore
            this._text = this._text.replace(`<u>${text}</u>`, text);
        }

        // @ts-ignore
        this._text = this._text.replace(text, `<u>${text}</u>`);

        return this;
    }

    voice<Substring extends string>(text: T extends `${string}${Substring}${string}` ? Substring: never, name: string) {
        if ( new RegExp(`<v ${name}>${text}</v>`).test(this._text) ) {
            // @ts-ignore
            this._text = this._text.replace(`<v ${name}>${text}</v>`, text);
        }

        // @ts-ignore
        this._text = this._text.replace(text, `<v ${name}>${text}</v>`);

        return this;
    }

    removeTags() {
        // @ts-ignore
        this._text = stripTags(this._text);

        return this;
    }

    public get text() {
        return this._text;
    }

    public toString(format?: 'vtt'|'srt') {
        if ( format === 'srt' ) {
            return this.removeTags().text;
        }

        return this.text;
    }
}