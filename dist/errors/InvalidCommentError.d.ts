export default class InvalidCommentError extends Error {
    constructor(message: string, comment?: string);
}
