import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class OperationService extends BaseAPIService {
    getAccountOperations(accountSlug: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/operation/account/${accountSlug}?page=${page}&size=${size}`)
    }

    getAccountOperationsList(accountSlug: string) {
        return this.httpGetCall(`/operation/all/account/${accountSlug}`)
    }
}
