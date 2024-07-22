import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { navigateBack, handleFormError } from 'src/app/commons/helpers';
import { CreditRequestService } from 'src/app/services/credit-request.service';
import { RefundRequestService } from 'src/app/services/refund-request.service';

@Component({
  selector: 'app-refund-request-create',
  templateUrl: './refund-request-create.component.html',
  styleUrls: ['./refund-request-create.component.css']
})
export class RefundRequestCreateComponent implements OnChanges {
  displayModal: any;
  form: FormGroup
  Permissions = Permissions

  @Input()
  codeAgent: string
  protected readonly Object = Object;

  constructor(private refundRequestService: RefundRequestService, private router: Router, public keycloakService:KeycloakService) {
      this.form = new FormGroup({
          amount: new FormControl('', Validators.required)
      })
      console.log("code agent" + this.codeAgent);
  
      this.displayModal = false
  }
  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.codeAgent);   
  }



  toggleModal() {
      this.displayModal = !this.displayModal
  }

  initiateRefunds() {
      this.refundRequestService.initiateRefunds(
          this.codeAgent,
          this.form.get('amount')?.value
      ).subscribe({
          next: (response) => {
              navigateBack(this.router)
          },
          error: (err: AppError) => handleFormError(err, this.form)
      })
  }

  

  onSubmit(){
    this.initiateRefunds();
  }
}
