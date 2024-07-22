import { SystemCurrency } from "../enums/SystemCurrency"

export interface Account {
    slug: string
    balance: number
    currency: SystemCurrency
    active: boolean
}
