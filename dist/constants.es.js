const E = /^WEBVTT|^\uFEFFWEBVTT/, s = /^WEBVTT ?(?<description>(?!\s).+)?\n?(?<meta>(.*\n?)*)?/, T = /(?<identifier>[^\n]*(?![\d+:.,]+ --> [\d+:.,]))?\n?(?<timings>[\d+:.,]+ --> [\d+:.,]+)\n(?<text>(?<=.\d\n).+)/s, n = /^NOTE\s\n?(?<text>.*)/s, t = /STYLE\s+::cue(\((?<selector>[^\n]+)\))?\s+?{\s+(?<styles>[^]+)\s+}/s;
export {
  n as SEGMENT_COMMENT_REGEX,
  T as SEGMENT_CUE_REGEX,
  s as SEGMENT_HEADER_REGEX,
  t as SEGMENT_STYLE_REGEX,
  E as VTT_VALIDATION_REGEX
};
