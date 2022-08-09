export default class InvalidCueError extends Error {
    constructor(message: string, cue?: string) {
        if (cue) {
            message = `\n\n${cue}\n\n--------\n${message}`
        }

        super(message);
    }
}