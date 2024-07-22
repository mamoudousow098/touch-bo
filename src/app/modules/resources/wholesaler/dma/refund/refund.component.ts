import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { navigateBack, handleFormError } from 'src/app/commons/helpers';
import { WholesalerService } from 'src/app/services/wholesaler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent{

  form: FormGroup
  displayModal: any;
  @Input()
  codeWholesaler: string
  formDisabled = false
  Permissions = Permissions
  dmaActivated: boolean





  constructor(private wholesalerService: WholesalerService,
              private toastr: ToastrService,
              private router: Router,
              public keycloakService: KeycloakService
              ) {
                
        
      this.form = new FormGroup({
          amount: new FormControl(0, Validators.required),         
      })
      

      this.displayModal = false

  }
    
    


  submit() {
      this.formDisabled = true
      this.wholesalerService.refundDma(
          this.codeWholesaler,
          this.form.get('amount')?.value
      ).subscribe({
          next: (response) => {
              if (response.statusCode == 200) {
                  this.formDisabled = false
                  this.toastr.success('WholeSaler\'s overdraft refund succed', 'Success');
                  navigateBack(this.router)
              } else {
                  this.formDisabled = false
                  this.toastr.error('WholeSaler\'s overdraft reund failed', 'Error');
              }
          },
          error: (err: AppError) => {
              this.formDisabled = false
              handleFormError(err, this.form)
          }
      })
  }

  toggleModal() {
      this.displayModal = !this.displayModal
  }

  

}
