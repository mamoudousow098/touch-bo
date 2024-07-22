import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { share } from 'rxjs';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { UnprocessableEntityError } from 'src/app/commons/errors/unprocessable-entity-error';
import { navigateBack, handleFormError } from 'src/app/commons/helpers';
import { Aggregator } from 'src/app/commons/interfaces/aggregator';
import { AggregatorService } from 'src/app/services/aggregator.service';
import { WholesalerService } from 'src/app/services/wholesaler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnChanges{

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
          overdraftLimitAmount: new FormControl(0, Validators.required),
          agentRecoveryPeriod: new FormControl(0, Validators.required)
          
      })
      

      this.displayModal = false

  }
    
    ngOnChanges(changes: SimpleChanges): void {
        this.wholesalerService.show(this.codeWholesaler).subscribe(
            {
                next: (response) => {
                    this.dmaActivated = response.data.outstandingAccount?.active;
                    if (response.data.outstandingAccount?.active) {
                        this.form.get('overdraftLimitAmount')?.setValue(response.data.overdraft),
                        this.form.get('agentRecoveryPeriod')?.setValue(response.data.agentRecoveryPeriod)
                        console.log("HEREEEEEEYYYYYYYYyy",response.data);
                    }
                console.log("HEREEEEEE AZAEZE",response.data);
                }
            }
        )

        console.log("HEREEEEEE");
        
    }


  submit() {
      this.formDisabled = true
      this.wholesalerService.activateDma(
          this.codeWholesaler,
          this.form.get('overdraftLimitAmount')?.value,
          this.form.get('agentRecoveryPeriod')?.value,
          true
      ).subscribe({
          next: (response) => {
              if (response.statusCode == 200) {
                  this.formDisabled = false
                  this.toastr.success('WholeSaler\'s overdraft activated', 'Success');
                  navigateBack(this.router)
              } else {
                  this.formDisabled = false
                  this.toastr.error('WholeSaler\'s overdraft activation failed', 'Error');
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

  deActivateDMA(){
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to disable this wholesaler\'s overdraft',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, disable it!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.value) {
            // Call your delete function here
            this.validateDeActivation();
            
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'This wholesaler\'s overdraft is still activated :)', 'error');
        }
    });
  }

  validateDeActivation(){
    this.wholesalerService.activateDma(
        this.codeWholesaler,
        0,
        0,
        false
    ).subscribe({
        next: (response) => {
            if (response.statusCode == 200) {
                this.formDisabled = false
                Swal.fire('Disabled!', 'This wholesaler\'s overdraft has been disabled.', 'success');
                this.toastr.success('WholeSaler\'s overdraft deactivated', 'Success');
                navigateBack(this.router)
            } else {
                this.formDisabled = false
                Swal.fire('WholeSaler\'s overdraft deactivation failed', 'error');
                this.toastr.error('WholeSaler\'s overdraft deactivation failed', 'Error');
            }
        },
        error: (err: AppError) => {
            this.formDisabled = false
            if (err instanceof UnprocessableEntityError) {
                Swal.fire(err.errors.message, 'error');
            }
            

            handleFormError(err, this.form)
        }
    })
  }

}
