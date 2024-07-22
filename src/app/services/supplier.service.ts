import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import { SystemCurrency } from '../commons/enums/SystemCurrency';

@Injectable({
    providedIn: 'root'
})
export class SupplierService extends BaseAPIService {
    getAll() {
        return this.httpGetCall(`/fournisseur/all`)
    }

    getPage(page: number = 0, size: number = 10) {
        return this.httpGetCall(`/fournisseur/getPage?page=${page}&size=${size}`)
    }

    create(codeFournisseur: string,name: string,files: File[],codeCurrency: string) {
        const formData = new FormData();

        formData.append('codeFournisseur', codeFournisseur)
        formData.append('codeAggregator', codeCurrency)
        formData.append('name', name)

        files.forEach(file => formData.append('files[]', file))
        return this.httpPostFormDataCall('/fournisseur/store', formData)
    }

    update(  name: string, codeFournisseur: string, files: File[]) {
        const formData = new FormData();

        formData.append('codeFournisseur', codeFournisseur)
        formData.append('name', name)

        files.forEach(file => formData.append('files[]', file))
        return this.httpPutCall('/fournisseur/update/' + codeFournisseur, formData)
    }

    show(code: string) {
        return this.httpGetCall('/fournisseur/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/fournisseur/delete/' + code)
    }
}
