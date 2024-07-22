import { Injectable } from '@angular/core';
import {BaseAPIService} from "./base-api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseAPIService{
    getAll(codeProduct: string = '', codeFournisseur: string = '', codeCategory: string = '') {
        console.log("BEIGEUIII FILS")
        return this.httpGetCall(`/product?codeProduct=${codeProduct}&codeFournisseur=${codeFournisseur}&codeCategory=${codeCategory}`)
    }

    getPage(codeProduct: string, codeCategory: string, page: number = 0, size: number = 10) {
        return this.httpGetCall(`/product/getPage?page=${page}&size=${size}&codeProduct=${codeProduct}&codeCategory=${codeCategory}`)
    }

    create(codeProduct: string,codeCategory: string, name: string,price:number,files: File[]) {
        const formData = new FormData();

        formData.append('codeProduct', codeProduct)
        formData.append('codeCategory', String(codeCategory))
        formData.append('name', name)
        formData.append('price', String(price))

        files.forEach(file => formData.append('files[]', file))
        return this.httpPostFormDataCall('/product/store', formData)
    }

    createBulk(products: any[]): Observable<any> {
        const formData = new FormData();
        products.forEach((product, index) => {
            formData.append(`products[${index}].codeProduct`, product.codeProduct);
            formData.append(`products[${index}].codeCategory`, product.codeCategory);
            formData.append(`products[${index}].name`, product.name);
            formData.append(`products[${index}].price`, product.price);
            product.files.forEach((file: File) => {
                formData.append(`products[${index}].files`, file, file.name);
            });
        });

        return this.httpPostFormDataCall(`/product/bulk`, formData);
    }

    createBulkExcel(products: any[]): Observable<any> {
        console.log("nio ngui nii dh products");
        console.log(products);
        return this.httpPostCall(`/product/bulkwithoutmedia`, { products });
    }


    update(code : string,codeCategory: string, name: string,price:number,files: File[]) {
        const formData = new FormData();
        formData.append('codeCategory',codeCategory );
        formData.append('name', name)
        formData.append('price', String(price))

        files.forEach(file => formData.append('files[]', file))
        return this.httpPutFormDataCall(`/product/update/${code}`, formData)
    }

    show(code: string) {
        return this.httpGetCall('/product/' + code)
    }

    delete(code: string) {
        return this.httpDeleteCall('/product/delete/' + code)
    }
}
