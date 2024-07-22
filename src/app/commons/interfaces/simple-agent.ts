import { Account } from "./account"
import { SimpleWholesaler } from "./simple-wholesaler"

export interface SimpleAgent {
    codeAgent: string
    description: string
    account: Account
    wholesaler: SimpleWholesaler
}
