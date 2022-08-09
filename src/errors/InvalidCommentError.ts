export default class InvalidCommentError extends Error {
    constructor(message: string, comment?: string) {
        if (comment) {
            message = `\n\n${comment}\n\n--------\n${message}`
        }

        super(message);
    }
}