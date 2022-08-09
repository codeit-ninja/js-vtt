export default class InvalidHeaderError extends Error {
    constructor(message: string, header?: string) {
        if (header) {
            message = `\n\n${header}\n\n--------\n${message}`
        }

        super(message);
    }
}