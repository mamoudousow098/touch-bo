import { Account } from "../interfaces/account";
import { AggregatorWholesaler } from "../interfaces/aggregator-wholesaler";
import {SimpleWholesaler} from "../interfaces/simple-wholesaler";

export class BaseSimpleWholesaler implements SimpleWholesaler {
    codeWholesaler: string;
    description: string;
    creditAccount: Account;
    active: boolean;
    aggregatorWholesaler: AggregatorWholesaler;


    constructor(wholesaler: SimpleWholesaler) {
        this.codeWholesaler = wholesaler.codeWholesaler
        this.description = wholesaler.description
        this.creditAccount = wholesaler.creditAccount
        this.active = wholesaler.active
        this.aggregatorWholesaler = wholesaler.aggregatorWholesaler
    }
    
}
