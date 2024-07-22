import {Wholesaler} from "../interfaces/wholesaler";
import {Aggregator} from "../interfaces/aggregator";
import {Account} from "../interfaces/account";
import {BaseAggregator} from "./aggregator";
import {BaseAccount} from "./account";
import {AggregatorWholesaler} from "../interfaces/aggregator-wholesaler";

export class BaseWholesaler implements Wholesaler {
    aggregator: Aggregator;
    creditAccount: Account
    commissionAccount: Account
    aggregatorWholesaler: AggregatorWholesaler
    codeWholesaler: string;
    createdAt: Date;
    description: string;
    active: boolean;

    constructor(wholesaler: Wholesaler) {
        this.codeWholesaler = wholesaler.codeWholesaler
        this.aggregator = new BaseAggregator(wholesaler?.aggregator)
        this.creditAccount = new BaseAccount(wholesaler.creditAccount)
        this.commissionAccount = new BaseAccount(wholesaler.commissionAccount)
        this.aggregatorWholesaler = wholesaler.aggregatorWholesaler
        this.description = wholesaler.description
        this.active = wholesaler.active
        this.createdAt = new Date(wholesaler.createdAt)
    }

}
