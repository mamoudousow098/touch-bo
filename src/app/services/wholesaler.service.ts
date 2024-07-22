import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";


@Injectable({
    providedIn: 'root'
})
export class WholesalerService extends BaseAPIService {
    getAll(codeWholesaler: string = '', codeAggregator: string = '') {
        console.log("BEIGEUIII FILS")
        return this.httpGetCall(`/wholesaler?codeWholesaler=${codeWholesaler}&codeAggregator=${codeAggregator}`)
    }

    getPage(codeWholesaler: string, codeAggregator: string, page: number = 0, size: number = 10) {
        return this.httpGetCall(`/wholesaler/getPage?page=${page}&size=${size}&codeWholesaler=${codeWholesaler}&codeAggregator=${codeAggregator}`)
    }

    create(codeWholesaler: string, codeAggregator: string, description: string) {
        return this.httpPostCall('/wholesaler/store', {
            codeWholesaler: codeWholesaler,
            codeAggregator: codeAggregator,
            description: description
        })
    }

    update(code: string, codeWholesaler: string, codeAggregator: string, description: string, active: string) {
        return this.httpPutCall('/wholesaler/update/' + code, {
            codeWholesaler: codeWholesaler,
            codeAggregator: codeAggregator,
            active: active,
            description: description
        })
    }

    show(code: string) {
        return this.httpGetCall('/wholesaler/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/wholesaler/delete/' + code)
    }

    bulkSettings(codeWholesaler: string, selectedAgents:string[], overdraftMaxDailyCount: number, overdraftLimitAmount: number,
                 overdraftBillingOccurrence: number, penaltyDelayInDays: number, maxCreditRequestAmount: number) {
        return this.httpPostCall('/wholesaler/bulk/settings', {
            codeWholesaler: codeWholesaler,
            selectedAgents: selectedAgents,
            overdraftLimitAmount: overdraftLimitAmount,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftBillingOccurrence: overdraftBillingOccurrence,
            penaltyDelayInDays: penaltyDelayInDays,
            maxCreditRequestAmount: maxCreditRequestAmount

        })
    }

    activateDma(codeWholesaler: string, overdraftLimitAmount: number, agentRecoveryPeriod: number, activate: boolean) {
        return this.httpPostCall('/wholesaler/activateDMA', {
            codeWholesaler: codeWholesaler,
            overdraftLimitAmount: overdraftLimitAmount,
            agentRecoveryPeriod: agentRecoveryPeriod,
            activate: activate
        })
    }

    refundDma(codeWholesaler: string, amount: number) {
        return this.httpPostCall('/refund/request/wholesaler/dma', {
            codeWholesaler: codeWholesaler,
            amount: amount})
    }
}
