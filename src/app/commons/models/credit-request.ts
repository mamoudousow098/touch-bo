import {CreditRequest} from "../interfaces/credit-request";
import {SimpleAgent} from "../interfaces/simple-agent";
import {BaseSimpleAgent} from "./simple-agent";

export class BaseCreditRequest implements CreditRequest {
    token: string
    amount: number
    fees: number
    outstandingBalance: number;
    recoveredAmount: number;
    status: string
    type: string
    agent: SimpleAgent
    createdAt: Date

    constructor(creditRequest: CreditRequest) {
        this.token = creditRequest.token
        this.amount = creditRequest.amount
        this.fees = creditRequest.fees
        this.status = creditRequest.status
        this.type = creditRequest.type
        this.outstandingBalance = creditRequest.outstandingBalance;
        this.recoveredAmount = creditRequest.recoveredAmount;
        this.agent = new BaseSimpleAgent(creditRequest.agent)
        this.createdAt = new Date(creditRequest.createdAt)
    }

}
