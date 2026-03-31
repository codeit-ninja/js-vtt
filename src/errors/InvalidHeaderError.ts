export default class InvalidHeaderError extends Error {
    constructor(message: string, header?: string) {
        if (header) {
            message = `${message}\n--------\n${header}\n--------`;
        }

        super(message);
    }
}
