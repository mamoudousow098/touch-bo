import {ErrorHandler} from "@angular/core";

export class AppErrorHandler extends ErrorHandler {
    override handleError(error: any) {
        console.log('from app error handler', error)
    }
}
