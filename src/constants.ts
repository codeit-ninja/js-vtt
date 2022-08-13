export const VTT_VALIDATION_REGEX = /^WEBVTT|^\uFEFFWEBVTT/;
export const SEGMENT_HEADER_REGEX = /^WEBVTT ?(?<description>(?!\s).+)?\n?(?<meta>(.*\n?)*)?/;
export const SEGMENT_CUE_REGEX = /(?<identifier>[^\n]*(?![\d+:.,]+ --> [\d+:.,]))?\n?(?<timings>[\d+:.,]+ --> [\d+:.,]+)\n(?<text>(?<=.\d\n).+)/s;
export const SEGMENT_COMMENT_REGEX = /^NOTE\s\n?(?<text>.*)/s;
export const SEGMENT_STYLE_REGEX = /STYLE\s+::cue(\((?<selector>[^\n]+)\))?\s+?{\s+(?<styles>[^]+)\s+}/s;