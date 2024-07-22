import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import { StageValidation } from '../interface/stage-validation';

@Injectable({
    providedIn: 'root'
})
export class CreditRequestService extends BaseAPIService {

    getCreditRequests(page: number = 0, size: number = 10, codeAgent: string = '', codeWholesaler: string = '', codeAggregator: string = '', type= '', status: string = '', startDate: string = '', endDate: string = '') {
        return this.httpGetCall(`/credit/request/search?page=${page}&size=${size}&codeWholesaler=${codeWholesaler}&codeAggregator=${codeAggregator}&typeCredit=${type}&codeAgent=${codeAgent}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
    }
    getCreditRequestsProduct(page: number = 0, size: number = 10, codeProduct: string = '',codeAgent: string = '', codeCategory: string = '', type= '', status: string = '', startDate: string = '', endDate: string = '', codeSupplier: string = '') {
        return this.httpGetCall(`/credit/request/searchProduct?page=${page}&size=${size}&codeWholesaler=${codeCategory}&typeCredit=${type}&codeAgent=${codeAgent}&codeProduct=${codeProduct}&status=${status}&startDate=${startDate}&endDate=${endDate}&codeFournisseur=${codeSupplier}`);
    }

    getAllCreditRequests(codeAgent: string = '', codeWholesaler: string = '', codeAggregator: string = '', type= '', status: string = '', startDate: string = '', endDate: string = '') {
        return this.httpGetCall(`/credit/request/search?codeWholesaler=${codeWholesaler}&codeAgent=${codeAgent}&codeAggregator=${codeAggregator}&typeCredit=${type}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
    }

    getAllCreditRequestsProducts(codeAgent: string = '', codeCategory: string = '', type= '', status: string = '', startDate: string = '', endDate: string = '') {
        return this.httpGetCall(`/credit/request/search?codeCategory=${codeCategory}&codeAgent=${codeAgent}&typeCredit=${type}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
    }

    storeOverdraft(codeAgent: string, amount: number) {
        return this.httpPostCall('/overdraft/request/store', {
            codeAgent: codeAgent,
            amount: amount
        })
    }

    initiateNanoCredit(codeAgent: string, amount: number, recoveryPeriodInDays: number, recoveryAmountByPeriod: number) {
        return this.httpPostCall('/nano-credit/request/initiate', {
            codeAgent: codeAgent,
            amount: amount,
            recoveryPeriodInDays: recoveryPeriodInDays,
            recoveryAmountByPeriod: recoveryAmountByPeriod
        })
    }

    validate(token: string, status: string) {
        return this.httpPostCall('/credit/request/validate', {
            token: token,
            status: status
        })
    }

    cancel(token: string) {
        return this.httpGetCall(`/credit/request/cancel/${token}`)
    }

    show(token: string) {
        return this.httpGetCall(`/credit/request/show/${token}`)
    }

    stageValidation(stageValidation: StageValidation) {
        return this.httpPostCall('/nano-credit/request/stage/validate', stageValidation)
    }
}
