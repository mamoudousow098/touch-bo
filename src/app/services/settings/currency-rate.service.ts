import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';
import { PaginatedResource } from 'src/app/commons/interfaces/paginated-resource';
import { Response } from 'src/app/commons/models/response';
import { CurrencyRate } from 'src/app/interface/currency-rate';
import { BaseAPIService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService extends BaseAPIService {
  
 

  create(currencyFrom: SystemCurrency, currencyTo: SystemCurrency, rate: number):Observable<Response<CurrencyRate>> {
    return this.httpPostCall(`/settings/currency/rate/store`, {
      currencyFrom: currencyFrom.toString(),
      currencyTo: currencyTo.toString(),
      rate: rate
    })
  }

  update(codeCurrencyRate: string, rate: number):Observable<Response<CurrencyRate>> {
    return this.httpPutCall(`/settings/currency/rate/update/${codeCurrencyRate}?rate=${rate}`, {})
  }

  getPage(page: number = 0, size: number = 10):Observable<Response<PaginatedResource<CurrencyRate>>>{
    return this.httpGetCall(`/settings/currency/rate?page=${page}&size=${size}`)
  }


  get(codeCurrencyRate: string):Observable<Response<CurrencyRate>>{
    return this.httpGetCall(`/settings/currency/rate/${codeCurrencyRate}`)
  }
  
  delete(codeCurrencyRate: string):Observable<any>{
    return this.httpDeleteCall(`/settings/currency/rate/delete/${codeCurrencyRate}`);
  }
}
