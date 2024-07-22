import {Account} from "./account";

export interface Aggregator {
    codeAggregator: string
    description: string
    webhook: string
    creditAccount: Account;
    commissionAccount: Account;
    createdAt: Date
}
