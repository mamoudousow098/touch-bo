import {Account} from "./account";

export interface Lender {
    codeLender: string
    description: string
    creditAccount: Account
    commissionAccount: Account
    createdAt: Date
}
