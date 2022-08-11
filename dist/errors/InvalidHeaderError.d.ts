export default class InvalidHeaderError extends Error {
    constructor(message: string, header?: string);
}
