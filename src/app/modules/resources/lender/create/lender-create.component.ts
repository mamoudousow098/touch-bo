import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderService} from "../../../../services/lender.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {ToastrService} from "ngx-toastr";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-lender-create',
    templateUrl: './lender-create.component.html',
    styleUrls: ['./lender-create.component.css']
})
export class LenderCreateComponent {

    form: FormGroup
    displayModal: boolean
    formDisabled = false
    Permissions = Permissions
    constructor(private lenderService: LenderService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService,
                private translateService : TranslateService

    ) {
        this.form = new FormGroup({
            codeLender: new FormControl('', Validators.required),
            currency: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.displayModal = false

    }

    private updateTranslatedLabel() {
        this.translateService.get('LENDER_CREATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    private updateTranslatedLabelErr() {
        this.translateService.get('LENDER_CREATED_FAILED').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('ERROR'));
        });
    }
    create() {
        this.formDisabled = true
        this.lenderService.create(
            this.form.get('codeLender')?.value,
            this.form.get('description')?.value,
            this.form.get('currency')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.updateTranslatedLabel()
                    navigateBack(this.router)
                } else {
                    this.formDisabled = false
                    this.updateTranslatedLabelErr()
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

    changeCurrency($event: SystemCurrency) {
        console.log($event);
        this.form.get('currency')?.setValue($event)
        console.log(this.form.value);

    }
}
