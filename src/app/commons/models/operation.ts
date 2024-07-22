import {Operation} from "../interfaces/operation";

export class BaseOperation implements Operation {
    amount: number;
    balanceAfter: number;
    balanceBefore: number;
    createdAt: Date;
    fees: number;
    token: string;
    type: string;

    constructor(operation: Operation) {
        this.amount = operation.amount
        this.balanceAfter = operation.balanceAfter
        this.balanceBefore = operation.balanceBefore
        this.type = operation.type
        this.token = operation.token
        this.createdAt = new Date(operation.createdAt)
    }

}
