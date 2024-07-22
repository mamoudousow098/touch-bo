import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class OverdraftService extends BaseAPIService {
    getAll(codeAgent: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/overdraft/request/${codeAgent}?page=${page}&size=${size}`)
    }

    getAllList(codeAgent: string) {
        return this.httpGetCall(`/overdraft/request/all/${codeAgent}`)
    }
}
