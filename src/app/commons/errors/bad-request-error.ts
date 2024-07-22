import {AppError} from "./app-error";

export class BadRequestError extends AppError {
    errors: Object;

    constructor(public override originalError ?: any) {
        super(originalError);

        this.errors = originalError.hasOwnProperty('error')
            ? originalError.error.hasOwnProperty('errors') ? originalError.error.errors : null
            : null
    }

}
