import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import {CommissionPlan, CommissionPlanUpdate} from "../commons/interfaces/commission-plan";

@Injectable({
    providedIn: 'root'
})
export class CommissionPlanService extends BaseAPIService {

    getAll(code: string, type: string, page: number = 0, size: number = 5) {
        return this.httpGetCall(`/commission/plan?code=${code}&type=${type}&page=${page}&size=${size}`)
    }

    getAllList(code: string, type: string) {
        return this.httpGetCall(`/commission/plan/all?code=${code}&type=${type}`)
    }

    create(commissionPlan: CommissionPlan) {
        return this.httpPostCall('/commission/plan/store', commissionPlan)
    }

    delete(id: number) {
        return this.httpDeleteCall(`/commission/plan/delete/${id}`)
    }

    update(id : number, commissionPlan: CommissionPlanUpdate) {
        return this.httpPutCall(`/commission/plan/update/${id}`, commissionPlan)
    }

    show(id: number) {
        return this.httpGetCall(`/commission/plan/show/${id}`)
    }

}
