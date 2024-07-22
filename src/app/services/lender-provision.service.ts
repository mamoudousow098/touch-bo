import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class LenderProvisionService extends BaseAPIService {

    getAll(codeLender: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/lender/provision/${codeLender}?page=${page}&size=${size}`)
    }

    getAllList(codeLender: string) {
        return this.httpGetCall(`/lender/provision/all/${codeLender}`)
    }

    create(codeLender: string, amount: number, files: File[]) {
        const formData = new FormData();

        formData.append('codeLender', codeLender)
        formData.append('amount', String(amount))

        files.forEach(file => formData.append('files[]', file))

        return this.httpPostFormDataCall('/lender/provision/store', formData)
    }

    show(token: string) {
        return this.httpGetCall(`/lender/provision/show/${token}`)
    }

    validate(token: string, status: string) {
        return this.httpPostCall('/lender/provision/validate', {
            token: token,
            status: status
        })
    }
}
