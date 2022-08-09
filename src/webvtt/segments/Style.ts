import Segment from "./Segment";
import {isStyle} from "../../utils";
import InvalidStyleError from "../../errors/InvalidStyleError";
import {camelCase, fromPairs, kebabCase, toPairs} from "lodash";

export default class Style<T extends Partial<CSSStyleDeclaration> = {}> extends Segment {
    /**
     * Construct a new comment
     *
     * If an array of strings is passed,
     * output will be generated as a multi-line comment.
     *
     * @param _styles
     * @param _selector
     */
    constructor( protected _styles?: T, protected _selector?: string ) {
        super();
    }

    public get styles() {
        return this._styles;
    }

    public get selector() {
        return this._selector;
    }

    toString() {
        return `STYLE\n::cue${(this.selector) ? `(${this.selector})` : ''} {\n${toPairs(this.styles).map(s => ['\t' + kebabCase(s[0]), s[1]].join(': ')).join(';\n')};\n}`;
    }

    public static fromString(style: string, error = true) {
        const isValidStyle = isStyle(style);
        let styles: Partial<CSSStyleDeclaration> = {};

        if ( ! isValidStyle ) {
            if( ! error  ) {
                return false;
            }

            throw new InvalidStyleError('STYLE segment seems malformed, make sure its in a valid format.', style);
        }

        if ( isValidStyle.groups?.styles ) {
            styles = fromPairs(isValidStyle.groups.styles.replace(/ {2,}/g, '').split('\n').map(s => {
                const keyValuePair = s.replace(': ', ':').replace(';', '').split(':');

                return [camelCase(keyValuePair[0]), keyValuePair[1]];
            }));
        }

        return new Style(styles, isValidStyle.groups?.selector);
    }
}