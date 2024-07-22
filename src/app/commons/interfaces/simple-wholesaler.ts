import { Account } from "./account"
import { AggregatorWholesaler } from "./aggregator-wholesaler"

export interface SimpleWholesaler {
    codeWholesaler: string
    description: string
    creditAccount: Account
    active: boolean
    aggregatorWholesaler: AggregatorWholesaler
}
