import { SystemCurrency } from "../enums/SystemCurrency";
import {CreditRequest} from "./credit-request";

export interface OverviewRefundRequest {
    token: string
    amount: number
    status: string
    currency: SystemCurrency
    creditRequest: CreditRequest
    createdAt: Date
}
