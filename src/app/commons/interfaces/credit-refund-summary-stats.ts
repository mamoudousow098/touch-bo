import { ChartDataset } from './chart-dataset';

export interface CreditAndRefundSummaryStats {
    creditRequests: ChartDataset[],
    refunds: ChartDataset[],
    creditRequestParts: ValueByPart[],
    refundParts: ValueByPart[],
    feesParts: ValueByPart[]
}

interface ValueByPart{
    type: string
    value: number

}