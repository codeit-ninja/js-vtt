import { isNote, isCue, isHeader, isRegion, isStyle } from './helpers';
import { Cue, InvalidVttError, Region } from './index';
import { Header } from './segments/header';
import { Segment } from './segments/segment';
import { CueCSSProperty, Style } from './segments/style';
import { Comment } from './segments/comment';
import { CueSettings } from './segments/cue';
import { RegionAnchor } from './segments/region';

export class VTT {
    #segments: Segment[] = [];
    #header: Header;
    /**
     * Gets the list of segments in the VTT instance, which includes cues, regions, styles, and comments.
     * The header segment is included as the first element in this list.
     *
     * @returns An array of Segment instances representing all segments in the VTT file, including the header as the first segment.
     */
    get segments() {
        return this.#segments;
    }
    /**
     * Gets the header segment of the VTT instance, which contains metadata and description information about the VTT file.
     * The header is the first segment in the internal list of segments and is initialized when a new VTT instance is created.
     *
     * @returns The Header instance representing the header segment of the VTT file.
     */
    get header() {
        return this.#header;
    }
    /**
     * Initializes a new VTT instance with an optional description and metadata for the header.
     * The header is created and added as the first segment of the VTT instance.
     *
     * @param description - An optional string to set as the description in the header.
     * @param meta - An optional object containing key-value pairs to set as metadata in the header.
     */
    constructor(description?: string, meta?: Record<string, string>) {
        this.#header = new Header(description, meta);
        this.#segments.push(this.#header);
    }
    /**
     * Updates the header information of the VTT instance, allowing you to set a new description and/or metadata.
     * This method modifies the existing header segment with the provided values.
     *
     * @param description - An optional string to set as the new description in the header.
     * @param meta - An optional object containing key-value pairs to set as the new metadata in the header
     *
     * @returns The VTT instance with the updated header information, allowing for method chaining.
     */
    setHeader(description?: string, meta?: Record<string, string>) {
        if (description) {
            this.#header.setDescription(description);
        }

        if (meta) {
            this.#header.setMeta(meta);
        }

        return this;
    }
    /**
     * Adds a new segment to the VTT instance. The segment can be of any type that extends the base Segment class, such as Cue, Region, Style, or Comment.
     * This method appends the provided segment to the internal list of segments in the VTT instance.
     *
     * @param segment - An instance of a class that extends Segment (e.g., Cue, Region, Style, Comment) to be added to the VTT.
     *
     * @returns The VTT instance with the new segment added, allowing for method chaining.
     */
    addSegment(segment: Segment) {
        this.#segments.push(segment);
        return this;
    }
    /**
     * Adds a new cue to the VTT instance.
     * This method creates a new Cue instance with the provided parameters and adds it to the internal list of segments.
     *
     * @param startTime - The start time of the cue in seconds.
     * @param endTime - The end time of the cue in seconds.
     * @param text - The text content of the cue.
     * @param identifier - An optional identifier for the cue.
     * @param settings - Optional settings for the cue.
     *
     * @returns The VTT instance with the new cue added, allowing for method chaining.
     */
    addCue(
        startTime: number,
        endTime: number,
        text: string,
        identifier?: string | number,
        settings?: CueSettings,
    ) {
        const cue = new Cue(startTime, endTime, text, identifier, settings);
        this.addSegment(cue);
        return this;
    }
    /**
     * Adds a new region to the VTT instance.
     * This method creates a new Region instance with the provided parameters and adds it to the internal list of segments.
     *
     * @param id - An optional identifier for the region.
     * @param width - An optional width for the region, expressed as a percentage (e.g., 40 for "40%").
     * @param lines - An optional number of lines for the region.
     * @param regionAnchor - An optional region anchor, expressed as an [x, y] pair of percentages.
     * @param viewportAnchor - An optional viewport anchor, expressed as an [x, y] pair of percentages.
     * @param scroll - An optional scroll setting for the region, which can be set to 'up'.
     *
     * @return The VTT instance with the new region added, allowing for method chaining.
     */
    addRegion(
        id?: string,
        width?: number,
        lines?: number,
        regionAnchor?: RegionAnchor,
        viewportAnchor?: RegionAnchor,
        scroll?: 'up',
    ) {
        const region = new Region(id, width, lines, regionAnchor, viewportAnchor, scroll);
        this.addSegment(region);
        return this;
    }
    /**
     * Adds a new style segment to the VTT instance.
     * This method creates a new Style instance with the provided selectors and declarations, and adds it to the internal list of segments.
     *
     * @param selectors - An array of CSS selectors that the style rules will apply to.
     * @param declarations - An object containing CSS property-value pairs that define the style rules.
     *
     * @returns The VTT instance with the new style segment added, allowing for method chaining.
     */
    addStyle(
        selectors: string[],
        declarations: Partial<Pick<CSSStyleDeclaration, CueCSSProperty>>,
    ) {
        const style = new Style([{ selectors, declarations }]);
        this.addSegment(style);
        return this;
    }
    /**
     * Adds a new comment segment to the VTT instance.
     * This method creates a new Comment instance with the provided text and adds it to the internal list of segments.
     *
     * @param text - The text content of the comment to be added.
     *
     * @returns The VTT instance with the new comment segment added, allowing for method chaining.
     */
    addComment(text: string) {
        const comment = new Comment(text);
        this.addSegment(comment);
        return this;
    }
    /**
     * Shifts all cue timings by a specified offset in seconds. Positive values will delay cues, while negative values will advance them.
     * This is useful for synchronizing cues with video content that has been edited or when the timing needs to be adjusted.
     * @param offset - The amount of time in seconds to shift the cue timings. Can be positive or negative.
     *
     * @returns The VTT instance with updated cue timings.
     */
    shiftTime(offset: number) {
        for (const segment of this.#segments) {
            if (segment instanceof Cue) {
                segment.setStartTime(segment.startTime + offset);
                segment.setEndTime(segment.endTime + offset);
            }
        }

        return this;
    }
    /**
     * Scales cue timings by the ratio of new duration to original duration.
     * Useful for syncing cues when the video has been edited and its duration has changed.
     *
     * @param originalDuration - The original duration of the video in seconds.
     * @param newDuration - The new duration of the video in seconds.
     * @returns The VTT instance with updated cue timings.
     */
    rescale(originalDuration: number, newDuration: number) {
        const ratio = newDuration / originalDuration;

        for (const segment of this.#segments) {
            if (segment instanceof Cue) {
                segment.setStartTime(segment.startTime * ratio);
                segment.setEndTime(segment.endTime * ratio);
            }
        }

        return this;
    }
    /**
     * Remaps cue timings from one frame rate to another.
     *
     * Use this when subtitles were authored against a video at `sourceFps`
     * but need to sync with the same video encoded at `targetFps`.
     * Every timestamp is multiplied by `sourceFps / targetFps` so that
     * frame numbers are preserved across the frame rate change.
     *
     * @example
     * // Subtitles authored for 59 fps, video is 30 fps
     * vtt.syncFps(59, 30); // factor ≈ 1.967
     *
     * @param sourceFps - The frame rate the subtitles were authored for.
     * @param targetFps - The frame rate of the target video.
     */
    syncFps(sourceFps: number, targetFps: number): this {
        const factor = sourceFps / targetFps;

        for (const segment of this.#segments) {
            if (segment instanceof Cue) {
                segment.setStartTime(segment.startTime * factor);
                segment.setEndTime(segment.endTime * factor);
            }
        }

        return this;
    }
    /**
     * Validates the VTT file by checking the header and all segments for correctness.
     *
     * @returns true if the VTT file is valid, false otherwise.
     */
    validate(): boolean {
        if (!this.#header.isValid()) {
            return false;
        }

        for (const segment of this.#segments.slice(1)) {
            if (!segment.isValid()) {
                return false;
            }
        }

        return true;
    }
    /**
     * Retrieves all cue segments from the VTT instance, filtering the internal list of segments to return only those that are instances of the Cue class.
     *
     * @returns An array of Cue instances representing all cue segments in the VTT file.
     */
    getCues() {
        return this.#segments.filter((s): s is Cue => s instanceof Cue);
    }
    /**
     * Converts the VTT instance to a JSON representation, including the header and all segments.
     * This can be useful for serialization, debugging, or interoperability with other systems.
     *
     * @returns A JSON object representing the VTT file.
     */
    toJSON() {
        return {
            header: this.#header.toJSON(),
            segments: this.#segments.slice(1).map((s) => s.toJSON()),
        };
    }
    /**
     * Converts the VTT instance to a string in either WebVTT or SRT format.
     * The header is included only in WebVTT format, as SRT does not support headers.
     *
     * Each segment is converted to its string representation and concatenated with double newlines as separators.
     *
     * @param format - The desired output format, either 'vtt' for WebVTT or 'srt' for SubRip. Defaults to 'vtt'.
     * @returns A string representation of the VTT file in the specified format.
     */
    toString(format: 'vtt' | 'srt' = 'vtt') {
        let index = 0;
        return this.#segments
            .map((s) => {
                if (s instanceof Cue) {
                    return s.toString(format, ++index);
                }

                return s.toString(format);
            })
            .filter(Boolean)
            .join('\n\n');
    }
    /**
     * Parses a VTT file from a string input, extracting the header and segments to construct a VTT instance.
     * The input string is expected to be in valid WebVTT format, with segments separated by double newlines.
     *
     * @param str - The input string containing the VTT file content.
     * @returns A VTT instance constructed from the parsed string.
     */
    static fromString(str: string) {
        const segments = str
            .replace(/^\uFEFF/, '')
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(new RegExp(String.fromCharCode(0), 'g'), '\uFFFD')
            .split(/\n{2,}/)
            .filter((s) => s.trim());
        const headerSegment = segments.shift()!;

        if (!isHeader(headerSegment)) {
            throw new InvalidVttError('Invalid VTT file: Header is malformed', headerSegment);
        }

        const header = Header.fromString(headerSegment);
        const vtt = new VTT(header.description, header.meta);

        for (const segment of segments) {
            if (isStyle(segment)) {
                vtt.addSegment(Style.fromString(segment));
            }

            if (isCue(segment)) {
                vtt.addSegment(Cue.fromString(segment));
            }

            if (isRegion(segment)) {
                vtt.addSegment(Region.fromString(segment));
            }

            if (isNote(segment)) {
                vtt.addSegment(Comment.fromString(segment));
            }
        }

        return vtt;
    }
    /**
     * Parses a VTT file from a JSON representation, reconstructing the header and segments to create a VTT instance.
     * The input JSON is expected to have a structure matching the output of the `toJSON` method, with a header object and an array of segments.
     *
     * @param json - The input JSON object representing the VTT file.
     * @returns A VTT instance constructed from the parsed JSON.q
     */
    static fromJSON(json: ReturnType<VTT['toJSON']>) {
        const vtt = new VTT(json.header.description, json.header.meta);

        for (const segment of json.segments) {
            if ('rules' in segment) {
                vtt.addSegment(new Style(segment.rules));
            } else if ('startTime' in segment) {
                vtt.addSegment(
                    new Cue(
                        segment.startTime,
                        segment.endTime,
                        segment.text,
                        segment.identifier,
                        segment.settings,
                    ),
                );
            } else if ('regionAnchor' in segment) {
                vtt.addSegment(
                    new Region(
                        segment.id,
                        segment.width,
                        segment.lines,
                        segment.regionAnchor,
                        segment.viewportAnchor,
                        segment.scroll,
                    ),
                );
            } else if ('text' in segment) {
                vtt.addSegment(new Comment(segment.text));
            }
        }

        return vtt;
    }
    /**
     * Loads a VTT file from a URL, fetching its content and parsing it into a VTT instance.
     *
     * @param url - The URL of the VTT file to load.
     * @returns A promise that resolves to a VTT instance constructed from the fetched file.
     */
    static fromURL(url: string) {
        return fetch(url)
            .then((res) => res.text())
            .then((text) => VTT.fromString(text))
            .catch((err) => {
                throw new Error(`Failed to load VTT file from URL: ${err.message}`);
            });
    }
}
