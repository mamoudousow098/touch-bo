import {Lender} from "../interfaces/lender";
import {Account} from "../interfaces/account";
import {BaseAccount} from "./account";

export class BaseLender implements Lender {
    codeLender: string;
    createdAt: Date;
    creditAccount: Account;
    commissionAccount: Account;
    description: string;

    constructor(lender: Lender) {
        this.codeLender = lender.codeLender
        this.description = lender.description
        this.creditAccount = new BaseAccount(lender.commissionAccount)
        this.commissionAccount = new BaseAccount(lender.creditAccount)
        this.createdAt = new Date(lender.createdAt)
    }
}
