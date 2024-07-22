import { SystemCurrency } from "../commons/enums/SystemCurrency"

export interface CurrencyRate {
    codeCurrencyRate: string
    currencyFrom: SystemCurrency
    currencyTo: SystemCurrency
    rate: number
}
