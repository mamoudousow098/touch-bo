export interface CommissionPlan {
    id?: number
    startAmount: number
    endAmount: number
    feesFix: number
    feesPercentage: number
    commissionAggregator: number
    commissionWholesaler: number
    commissionLender: number
    commissionSystem: number
    operationType: string
    resourceType: string
    resourceCode: string
}


export interface CommissionPlanUpdate {
    startAmount: number
    endAmount: number
    feesFix: number
    feesPercentage: number
    commissionAggregator: number
    commissionWholesaler: number
    commissionLender: number
    commissionSystem: number
}
