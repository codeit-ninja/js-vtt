export default class InvalidStyleError extends Error {
    constructor(message: string, style?: string) {
        if (style) {
            message = `\n\n${style}\n\n--------\n${message}`
        }

        super(message);
    }
}