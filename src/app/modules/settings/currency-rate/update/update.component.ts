import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';
import { AppError } from 'src/app/commons/errors/app-error';
import { handleFormError, navigateBack } from 'src/app/commons/helpers';
import { CurrencyRateService } from 'src/app/services/settings/currency-rate.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent{

    @Input() codeCurrencyRate: string
    form: FormGroup
    displayModal: boolean
    formDisabled = false
    Permissions = Permissions
    rate : number
    constructor(private currencyRateService: CurrencyRateService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService

    ) {
      

        this.displayModal = false

    }


    
    update() {
        this.formDisabled = true
        this.currencyRateService.update(this.codeCurrencyRate, this.rate
            
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.toastr.success('Currency rate updateed successfully', 'Success');
                    navigateBack(this.router)
                } else {
                    this.formDisabled = false
                    this.toastr.error('Currency rate update failed', 'Error');
                }
            },
            error: (err: AppError) => {
                handleFormError(err, this.form)
                this.formDisabled = false
            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

}
