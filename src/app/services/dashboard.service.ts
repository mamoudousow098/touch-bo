import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import { CreditRequestType } from '../commons/enums/CreditRequestType';
import { SystemCurrency } from '../commons/enums/SystemCurrency';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseAPIService {
    getMetrics() {
        return this.httpGetCall(`/dashboard/metrics`)
    }

    getMetricsFlux(dayBefore: number, currency = SystemCurrency.xof) {
        return this.httpGetCall(`/dashboard/metrics/flux?dayBefore=${dayBefore}&currency=${currency?.toString()}`)
    }

    getAggregatorMetricsByType(dayBefore: number, codeAggregator= '', type : CreditRequestType = CreditRequestType.Overdraft) {
        return this.httpGetCall(`/dashboard/metrics/aggregator/${type}?dayBefore=${dayBefore}&codeAggregator=${codeAggregator}`)
    }

    getCreditCountChartData(dayBefore: number, codeAggregator = '') {
        return this.httpGetCall(`/dashboard/stats/credit/count?dayBefore=${dayBefore}&codeAggregator=${codeAggregator}`)
    }

    getCreditFluxChartData(dayBefore: number, currency = SystemCurrency.xof) {
        return this.httpGetCall(`/dashboard/stats/credit/flux?dayBefore=${dayBefore}&currency=${currency?.toString()}`)
    }
    getCreditFluxChartDataByAggregator(dayBefore: number, codeAggregator = '') {
        return this.httpGetCall(`/dashboard/stats/credit/aggregator/flux?dayBefore=${dayBefore}&codeAggregator=${codeAggregator}`)
    }

    getCreditCountByAgentChartData(dayBefore: number, codeWholesaler = '') {
        return this.httpGetCall(`/dashboard/stats/credit/count/agent?dayBefore=${dayBefore}&codeWholesaler=${codeWholesaler}`)
    }

    getCreditFluxByAgentChartData(dayBefore: number, codeWholesaler = '') {
        return this.httpGetCall(`/dashboard/stats/credit/flux/agent?dayBefore=${dayBefore}&codeWholesaler=${codeWholesaler}`)
    }

    getCreditWholesalerCountChartData(dayBefore: number, codeWholesaler = '') {
        return this.httpGetCall(`/dashboard/stats/wholesaler/credit/count?dayBefore=${dayBefore}&codeWholesaler=${codeWholesaler}`)
    }

    getCreditWholesalerFluxChartData(dayBefore: number, codeWholesaler = '') {
        return this.httpGetCall(`/dashboard/stats/wholesaler/credit/flux?dayBefore=${dayBefore}&codeWholesaler=${codeWholesaler}`)
    }

    getCreditCountByWholesalerChartData(dayBefore: number, codeAggregator = '') {
        return this.httpGetCall(`/dashboard/stats/credit/count/wholesaler?dayBefore=${dayBefore}&codeAggregator=${codeAggregator}`)
    }

    getCreditFluxByWholesalerChartData(dayBefore: number, currency = SystemCurrency.xof) {
        return this.httpGetCall(`/dashboard/stats/credit/flux/global/wholesaler?dayBefore=${dayBefore}&currency=${currency?.toString()}`)
    }

    getCreditFluxByWholesalerChartDataByAggregator(dayBefore: number, codeAggregator = '') {
        return this.httpGetCall(`/dashboard/stats/credit/flux/wholesaler?dayBefore=${dayBefore}&codeAggregator=${codeAggregator}`)
    }

    getGeneratedCommissionByAggregator(codeAggregator: string) {
        return this.httpGetCall(`/dashboard/stats/commission/generated?codeAggregator=${codeAggregator}`)
    }


    getCreditAndRefundSummaryStatsByAggregator(dayBefore: number, codeAggregator = '') {
        return this.httpGetCall(`/dashboard/stats/credit/refund/summary/aggregator?dayBefore=${dayBefore}&codeAggregator=${codeAggregator}`)
    }

    getCreditAndRefundSummaryStats(dayBefore: number, currency = SystemCurrency.xof) {
        return this.httpGetCall(`/dashboard/stats/credit/refund/summary?dayBefore=${dayBefore}&currency=${currency?.toString()}`)
    }

    getSystemMetricsByCurrency(dayBefore: number, codeAggregator= '', currency : SystemCurrency) {
        return this.httpGetCall(`/dashboard/metrics/currency/${currency}?dayBefore=${dayBefore}&codeAggregator=${codeAggregator}`)
    }

    getCreditCountByAggregatorChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/count/aggregator?dayBefore=${dayBefore}`)
    }

    getCreditFluxByAggregatorChartData(dayBefore: number) {
        return this.httpGetCall(`/dashboard/stats/credit/flux/aggregator?dayBefore=${dayBefore}`)
    }
}
