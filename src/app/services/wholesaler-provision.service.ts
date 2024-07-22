import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class WholesalerProvisionService extends BaseAPIService {

    getAll(codeWholesaler: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/wholesaler/provision/${codeWholesaler}?page=${page}&size=${size}`)
    }

    getAllList(codeWholesaler: string) {
        return this.httpGetCall(`/wholesaler/provision/all/${codeWholesaler}`)
    }

    create(codeWholesaler: string, amount: number, files: File[]) {
        const formData = new FormData();

        formData.append('codeWholesaler', codeWholesaler)
        formData.append('amount', String(amount))

        files.forEach(file => formData.append('files[]', file))

        return this.httpPostFormDataCall('/wholesaler/provision/store', formData)
    }

    show(token: string) {
        return this.httpGetCall(`/wholesaler/provision/show/${token}`)
    }

    validate(token: string, status: string, creditAgentAccount: boolean) {
        return this.httpPostCall('/wholesaler/provision/validate', {
            token: token,
            status: status,
            creditAgentAccount: creditAgentAccount
        })
    }
}
