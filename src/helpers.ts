export const isHeader = (line: string) => {
    return /^(?:\uFEFF)?WEBVTT(?:[\t \n]|$)/.test(line);
};

export const isStyle = (line: string) => {
    return /^STYLE/.test(line);
};

export const isNote = (line: string) => {
    return /^NOTE/.test(line);
};

export const isCue = (str: string) => {
    return /^(?:[^\n]+\n)?(?:\d+:)?\d{2}:\d{2}\.\d{3}\s+-->\s+(?:\d+:)?\d{2}:\d{2}\.\d{3}/.test(
        str,
    );
};

export const isRegion = (str: string) => {
    return /^REGION(?:\n|$)/.test(str);
};

export const isComment = (str: string) => {
    return /^NOTE(?:\n|$)/.test(str);
};

export const isSRT = (str: string) => {
    return /^\d+\n\d{2}:\d{2}:\d{2},\d{3}\s+-->\s+\d{2}:\d{2}:\d{2},\d{3}/.test(str);
};
