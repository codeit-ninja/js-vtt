export default class InvalidVttError extends Error {
    constructor(message: string, vtt?: string) {
        if (vtt) {
            message = `\n\nReceived:\n\n${vtt.length > 100 ? vtt.slice(0, 100) + '...' : vtt}\n\n--------\n${message}`
        }

        super(message);
    }
}