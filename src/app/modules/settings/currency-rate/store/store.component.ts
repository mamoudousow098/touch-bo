import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';
import { AppError } from 'src/app/commons/errors/app-error';
import { navigateBack, handleFormError } from 'src/app/commons/helpers';
import { CurrencyDropdownComponent } from 'src/app/modules/shared/currency-dropdown/currency-dropdown.component';
import { LenderService } from 'src/app/services/lender.service';
import { CurrencyRateService } from 'src/app/services/settings/currency-rate.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
    form: FormGroup
    displayModal: boolean
    formDisabled = false
    Permissions = Permissions
    constructor(private currencyRateService: CurrencyRateService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService

    ) {
        this.form = new FormGroup({
            currencyFrom: new FormControl('', Validators.required),
            currencyTo: new FormControl('', Validators.required),
            rate: new FormControl(1, Validators.required),
        })

        this.displayModal = false

    }

    
    create() {
        this.formDisabled = true
        this.currencyRateService.create(
            this.form.get('currencyFrom')?.value,
            this.form.get('currencyTo')?.value,
            this.form.get('rate')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.toastr.success('Currency rate registered successfully', 'Success');
                    navigateBack(this.router)
                } else {
                    this.formDisabled = false
                    this.toastr.error('Currency rate registration failed', 'Error');
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

    changeCurrency($event: SystemCurrency, formField: string) {
        console.log($event);
        this.form.get(formField)?.setValue($event)
        console.log(this.form.value);
        
    }

}
