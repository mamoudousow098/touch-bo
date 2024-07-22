import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseAPIService{

    getAll() {
        return this.httpGetCall(`/category/all`)
    }

    getPage(page: number = 0, size: number = 10,codeFournisseur:string = "") {
        return this.httpGetCall(`/category/getPage?page=${page}&size=${size}&codeFournisseur=${codeFournisseur}`)
    }

    create(codeCategory: string, codeFournisseur:string,name: string,files: File[]) {
        const formData = new FormData();

        formData.append('codeCategory', codeCategory)
        formData.append('codeFournisseur', codeFournisseur)
        formData.append('name', name)

        files.forEach(file => formData.append('files[]', file))
        return this.httpPostFormDataCall('/category/store', formData)
    }

    update(code : string,codeFournisseur: string, name: string,files: File[]) {
        const formData = new FormData();
        formData.append('codeFournisseur',codeFournisseur );
        formData.append('name', name)

        files.forEach(file => formData.append('files[]', file))
        return this.httpPutFormDataCall(`/category/update/${code}`, formData)
    }

    show(code: string) {
        return this.httpGetCall('/category/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/category/delete/' + code)
    }
}
