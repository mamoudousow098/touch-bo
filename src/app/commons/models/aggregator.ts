import {Aggregator} from "../interfaces/aggregator";
import {Account} from "../interfaces/account";
import {BaseAccount} from "./account";

export class BaseAggregator implements Aggregator {
    codeAggregator: string;
    createdAt: Date;
    creditAccount: Account;
    commissionAccount: Account;
    description: string;
    webhook: string;

    constructor(aggregator: Aggregator) {
        this.codeAggregator = aggregator.codeAggregator
        this.description = aggregator.description
        this.creditAccount = new BaseAccount(aggregator.commissionAccount)
        this.commissionAccount = new BaseAccount(aggregator.creditAccount)
        this.createdAt = new Date(aggregator.createdAt)
        this.webhook = aggregator.webhook
    }
}
