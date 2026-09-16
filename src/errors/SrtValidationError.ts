export default class SrtValidationError extends Error {
    constructor(message: string, srt?: string) {
        if (srt) {
            message = `\n\nReceived:\n\n${srt.length > 100 ? srt.slice(0, 100) + '...' : srt}\n\n--------\n${message}`;
        }

        super(message);
    }
}
