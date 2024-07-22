export interface ChartDataset {
    type: string,
    codeAggregator: string,
    label: string,
    value: number
}

export interface CreditDataset {
    type: string
    flux: string,
    volume: number
}