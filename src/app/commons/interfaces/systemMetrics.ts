import { SystemCurrency } from "../enums/SystemCurrency"

export interface SystemMetrics{
    overdraftFlux: number
    nanoCreditFlux: number
    systemBalance: number
    currency: SystemCurrency
}