import Segment from "./Segment";
import {isHeader} from "../../utils";
import InvalidHeaderError from "../../errors/InvalidHeaderError";
import {fromPairs, toPairs} from 'lodash';

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

    public static fromString(header: string, error = true) {
        const isValidHeader = isHeader(header);
        let meta: Record<string, any> = {};

        if ( ! isValidHeader ) {
            if ( ! error ) {
                return false;
            }

            throw new InvalidHeaderError(`Appears to be invalid, could not determine timing payload.`, header)
        }

        if ( isValidHeader.groups?.meta ) {
            /**
             * Converts a string from
             *
             * WEBVTT
             * VTTKind: metadata
             * VTTDataFormat: <metadata format>
             * VTTDataHint: <metadata type>
             *
             * Into an object
             * {
             *     VTTKind: "metadata",
             *     VTTDataFormat: "<metadata format>",
             *     VTTDataHint: "<<metadata type>>"
             * }
             */
            meta = fromPairs(isValidHeader.groups?.meta.split('\n').map(m => m.split(':').map(m => m.replace(/^\s/, ''))));
        }

        return new Header(isValidHeader.groups?.description, meta);
    }
}