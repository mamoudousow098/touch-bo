import {SimpleLender} from "../interfaces/simple-lender";

export class BaseSimpleLender implements SimpleLender {
    codeLender: string;
    description: string;

    constructor(lender: SimpleLender) {
        this.codeLender = lender.codeLender
        this.description = lender.description
    }

}
