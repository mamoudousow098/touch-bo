import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import {Observable} from 'rxjs';
import {HttpEvent} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AgentService extends BaseAPIService {


    getAll(codeAggregator: string, codeAgent: string, codeWholesaler: string, refundIsLate?: boolean, page: number = 0, size: number = 10) {
        if (refundIsLate == null) {
            return this.httpGetCall(`/agent?page=${page}&size=${size}&codeAggregator=${codeAggregator}&codeAgent=${codeAgent}&codeWholesaler=${codeWholesaler}`)

        }
        return this.httpGetCall(`/agent?page=${page}&size=${size}&codeAggregator=${codeAggregator}&codeAgent=${codeAgent}&codeWholesaler=${codeWholesaler}&refundIsLate=${refundIsLate}`)
    }

    getAllList(codeAggregator: string = '', codeAgent: string = '', codeWholesaler: string = '', refundIsLate?: boolean) {
        if (refundIsLate == null) {
            return this.httpGetCall(`/agent/all?codeAggregator=${codeAggregator}&codeAgent=${codeAgent}&codeWholesaler=${codeWholesaler}`)
        }
        return this.httpGetCall(`/agent/all?codeAggregator=${codeAggregator}&codeAgent=${codeAgent}&codeWholesaler=${codeWholesaler}&refundIsLate=${refundIsLate}`)
    }

    getAllAgentWithDeficit(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/agent/deficit?page=${page}&size=${size}`)
    }

    create(codeAgent: string,
           codeWholesaler: string,
           codeWholesalers: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftLimitAmount: number,
           overdraftBillingOccurrence: number,
           maxCreditRequestAmount: number,
           penaltyDelayInDays: number) {
        return this.httpPostCall('/agent/store', {
            codeAgent: codeAgent,
            codeWholesaler: codeWholesaler,
            description: description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftLimitAmount: overdraftLimitAmount,
            overdraftBillingOccurrence: overdraftBillingOccurrence,
            maxCreditRequestAmount: maxCreditRequestAmount,
            penaltyDelayInDays: penaltyDelayInDays,
        })
    }

    update(code: string,
           codeWholesaler: string,
           codeAgent: string,
           description: string,
           overdraftMaxDailyCount: string,
           overdraftLimitAmount: number,
           overdraftBillingOccurrence: number,
           overdraftCountRefresh: boolean,
           maxCreditRequestAmount: number,
           penaltyDelayInDays: number,
           active: boolean) {
        return this.httpPutCall('/agent/update/' + code, {
            codeWholesaler: codeWholesaler,
            codeAgent: codeAgent,
            description: description,
            overdraftMaxDailyCount: overdraftMaxDailyCount,
            overdraftLimitAmount: overdraftLimitAmount,
            overdraftBillingOccurrence: overdraftBillingOccurrence,
            overdraftCountRefresh: overdraftCountRefresh,
            maxCreditRequestAmount: maxCreditRequestAmount,
            penaltyDelayInDays: penaltyDelayInDays,
            active: active
        })
    }

    show(code: string) {
        return this.httpGetCall('/agent/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/agent/delete/' + code)
    }

    getAggregators() {
        return this.httpGetCall('/aggregator');
    }


    uploadAgentsFromExcel(file: File): Observable<HttpEvent<any>> {

        // Create form data
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("file", file, file.name);
        // with formData as req
        return this.httpPostEventFormDataCall('/agent/upload/', formData)
    }

    countOfAgentWithLateRefund() {
        return this.httpGetCall(`/agent/late-refund/count`)
    }
}
