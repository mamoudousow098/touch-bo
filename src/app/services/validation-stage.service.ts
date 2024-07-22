import { Injectable } from '@angular/core';
import { BaseAPIService } from './base-api.service';
import { ValidationStage, ValidationStageStore, ValidationStageUpdate } from '../interface/validation-stage';

@Injectable({
  providedIn: 'root'
})
export class ValidationStageService extends BaseAPIService {

  getValidationOperations(token: string) {
    return this.httpGetCall(`/validation/operation/credit/${token}`);
  }

  getValidationStage(codeValidation: string) {
    return this.httpGetCall(`/validation/stage/show/${codeValidation}`);
  }

  getAllValidationStage(codeWholesaler: string){
    return this.httpGetCall(`/validation/stage/wholesaler/${codeWholesaler}`);
  }

  getFirstValidationStageByWholesaler(codeWholesaler: string){
    return this.httpGetCall(`/validation/stage/show/first/${codeWholesaler}`);
  }

  create(validationStage: ValidationStageStore){
    return this.httpPostCall(`/validation/stage/store`, validationStage)
  }

  update(codeValidation: string, validationStage: ValidationStageUpdate){
    return this.httpPutCall(`/validation/stage/update/${codeValidation}`, validationStage)
  }

  delete(codeValidationStage: string){
    return this.httpDeleteCall(`/validation/stage/delete/${codeValidationStage}`);
  }

}
