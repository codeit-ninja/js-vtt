export default class InvalidRegionError extends Error {
    constructor(message: string, region?: string) {
        if (region) {
            message = `\n\n${region}\n\n--------\n${message}`;
        }

        super(message);
    }
}
