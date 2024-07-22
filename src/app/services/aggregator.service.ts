import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import { SystemCurrency } from '../commons/enums/SystemCurrency';

@Injectable({
    providedIn: 'root'
})
export class AggregatorService extends BaseAPIService {
    getAll() {
        return this.httpGetCall(`/aggregator`)
    }

    getPage(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/aggregator/getPage?page=${page}&size=${size}`)
    }

    create(code: string, webhook: string, currency: SystemCurrency, description: string) {
        return this.httpPostCall('/aggregator/store', {
            codeAggregator: code,
            webhook: webhook,
            currency: currency.valueOf(),
            description: description
        })
    }

    update(code: string, webhook: string, description: string, codeAggregator: string) {
        return this.httpPutCall('/aggregator/update/' + code, {
            webhook: webhook,
            description: description,
            codeAggregator: codeAggregator,
        })
    }

    show(code: string) {
        return this.httpGetCall('/aggregator/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/aggregator/delete/' + code)
    }
}
