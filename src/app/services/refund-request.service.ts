import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class RefundRequestService extends BaseAPIService {

    getRefundRequests(page: number = 0, size: number = 10, codeWholesaler: string = '', codeAgent: string = '', status: string = '', startDate: string = '', endDate: string = '') {
        return this.httpGetCall(`/refund/request/search?page=${page}&size=${size}&codeWholesaler=${codeWholesaler}&codeAgent=${codeAgent}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
    }

    getAllRefundRequests(codeWholesaler: string = '', codeAgent: string = '', status: string = '', startDate: string = '', endDate: string = '') {
        return this.httpGetCall(`/refund/request/search?codeWholesaler=${codeWholesaler}&codeAgent=${codeAgent}&status=${status}&startDate=${startDate}&endDate=${endDate}`);
    }

    cancel(token: string){
        return this.httpGetCall(`/refund/request/cancel/${token}`);
    }

    initiateRefunds(codeAgent: string, amount: number) {
        return this.httpPostCall('/refund/request/initiate', {
            codeAgent: codeAgent,
            amount: amount
        })
    }

    validateRefunds(refundTokens: string[]) {
        return this.httpPostCall('/refund/request/validate', {
            refundTokens : refundTokens

        })
    }
}
