import Segment from "./Segment";
import {getHeader} from "../../utils";
import InvalidHeaderError from "../../errors/InvalidHeaderError";
import {toPairs} from 'lodash-es';

export default class Header<Meta extends Record<string, any>> extends Segment {
    /**
     * Construct a new comment
     *
     * If an array of strings is passed,
     * output will be generated as a multi-line comment.
     *
     * @param {string|string[]} _description
     * @param {object} _meta
     */
    constructor( protected _description?: string, protected _meta?: Meta ) {
        super();
    }

    public get description() {
        return this._description;
    }

    public get meta() {
        return this._meta;
    }

    public setDescription(description: string) {
        this._description = description;
    }

    public setMeta<Meta extends Record<string, any>>(meta: Meta): Meta {
        // @ts-ignore
        this._meta = meta;

        return meta;
    }

    toString() {
        return 'WEBVTT' + (this._description ? ' ' + this._description : '') + (this._meta && Object.keys(this._meta).length ? '\n' + toPairs(this._meta).map(m => m.join(': ')).join('\n') : '');
    }

    public static fromString(str: string, error = true) {
        const header = getHeader(str);

        if ( ! header ) {
            if ( ! error ) {
                return false;
            }

            throw new InvalidHeaderError(`Appears to be invalid, could not determine timing payload.`, str)
        }

        return new Header(header.description, header.meta);
    }
}