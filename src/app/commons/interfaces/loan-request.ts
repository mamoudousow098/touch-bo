import {SimpleWholesaler} from "./simple-wholesaler";
import {SimpleLender} from "./simple-lender";

export interface LoanRequest {
    token: string
    amount: number
    fees: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    lender: SimpleLender
    wholesaler: SimpleWholesaler
    createdAt: Date
}
