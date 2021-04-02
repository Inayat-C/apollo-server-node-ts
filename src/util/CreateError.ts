class CreateError extends Error {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
}

class BadRequest extends CreateError {
    constructor(message?: string) {
        super(
            400,
            message === undefined
                ? 'The server could not understand the request due to invalid syntax.'
                : message,
        );
    }
}

export { CreateError, BadRequest };
