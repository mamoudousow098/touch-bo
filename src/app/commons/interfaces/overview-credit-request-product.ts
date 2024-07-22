import { SystemCurrency } from "../enums/SystemCurrency";
import {OverviewAgent} from "./overview-agent";
import {Product} from "./product";

export interface OverviewCreditRequestProduct {
    token: string
    amount: number
    fees: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    product:Product
    type: string
    agent: OverviewAgent
    currency: SystemCurrency
    createdAt: Date
}
