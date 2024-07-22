import {LoanRequest} from "../interfaces/loan-request";
import {SimpleWholesaler} from "../interfaces/simple-wholesaler";
import {BaseSimpleWholesaler} from "./simple-wholesaler";
import {SimpleLender} from "../interfaces/simple-lender";
import {BaseSimpleLender} from "./simple-lender";

export class BaseLoanRequest implements LoanRequest {
    token: string
    amount: number
    fees: number
    outstandingBalance: number;
    recoveredAmount: number;
    status: string
    wholesaler: SimpleWholesaler
    lender: SimpleLender
    createdAt: Date

    constructor(loanRequest: LoanRequest) {
        this.token = loanRequest.token
        this.amount = loanRequest.amount
        this.fees = loanRequest.fees
        this.status = loanRequest.status
        this.outstandingBalance = loanRequest.outstandingBalance;
        this.recoveredAmount = loanRequest.recoveredAmount;

        this.wholesaler = new BaseSimpleWholesaler(loanRequest.wholesaler)
        this.lender = new BaseSimpleLender(loanRequest.lender)
        this.createdAt = new Date(loanRequest.createdAt)
    }

}
