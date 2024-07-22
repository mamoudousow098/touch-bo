import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import { SystemCurrency } from '../commons/enums/SystemCurrency';

@Injectable({
    providedIn: 'root'
})
export class LenderService extends BaseAPIService {
    getAll(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/lender?page=${page}&size=${size}`)
    }

    getPage(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/lender/getPage?page=${page}&size=${size}`)
    }

    create(code: string, description: string, currency: SystemCurrency) {
        return this.httpPostCall('/lender/store', {
            codeLender: code,
            currency: currency.valueOf(),
            description: description
        })
    }

    update(code: string, codeLender: string, description: string) {
        return this.httpPutCall('/lender/update/' + code, {
            codeLender: codeLender,
            description: description
        })
    }

    show(code: string) {
        return this.httpGetCall('/lender/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/lender/delete/' + code)
    }

    getAllByCurrency(currency: SystemCurrency) {
        return this.httpGetCall(`/lender/currency/${currency}`)
    }
}
