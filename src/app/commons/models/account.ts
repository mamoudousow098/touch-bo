import { SystemCurrency } from "../enums/SystemCurrency";
import {Account} from "../interfaces/account";

export class BaseAccount implements Account {
    balance: number;
    slug: string;

    constructor(account: Account) {
        this.slug = account.slug
        this.balance = account.balance
    }
    currency: SystemCurrency;
    active: boolean;
}
