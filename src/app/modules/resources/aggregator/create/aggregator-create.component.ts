import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AggregatorService} from "../../../../services/aggregator.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {ToastrService} from "ngx-toastr";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-aggregator-create',
    templateUrl: './aggregator-create.component.html',
    styleUrls: ['./aggregator-create.component.css']
})
export class AggregatorCreateComponent {
    form: FormGroup
    displayModal: boolean
    formDisabled = false;
    Permissions = Permissions

    constructor(private aggregatorService: AggregatorService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService,
                private translateService:TranslateService
    ) {
        this.form = new FormGroup({
            codeAggregator: new FormControl('', Validators.required),
            webhook: new FormControl('', Validators.required),
            currency: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.displayModal = false
    }
    private updateTranslatedLabel() {
        this.translateService.get('AGGREGATOR_CREATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    private updateTranslatedLabelErr() {
        this.translateService.get('AGGREGATOR_CREATED_FAILED').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    create() {
        this.formDisabled = true
        this.aggregatorService.create(
            this.form.get('codeAggregator')?.value,
            this.form.get('webhook')?.value,
            this.form.get('currency')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.updateTranslatedLabel()
                    this.formDisabled = false
                    navigateBack(this.router)
                } else {
                    this.updateTranslatedLabelErr();
                    this.formDisabled = false
                }
            },
            error: (err: AppError) => {
                handleFormError(err, this.form);
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
