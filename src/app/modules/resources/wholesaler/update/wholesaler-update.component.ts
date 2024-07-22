import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError} from "../../../../commons/helpers";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import {Aggregator} from 'src/app/commons/interfaces/aggregator';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-wholesaler-update',
    templateUrl: './wholesaler-update.component.html',
    styleUrls: ['./wholesaler-update.component.css']
})
export class WholesalerUpdateComponent implements OnChanges {

    @Input()
    wholesaler: Wholesaler
    @Input()
    aggregators$: Aggregator[] = []
    form: FormGroup
    displayModal: any;
    formError: string | null = null;
    formDisabled = false
    Permissions = Permissions


    constructor(private wholesalerService: WholesalerService,
                private router: Router,
                private toaster: ToastrService,
                public keycloakService: KeycloakService,
                private translateService : TranslateService
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.form = new FormGroup({
            codeWholesaler: new FormControl('', Validators.required),
            codeAggregator: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            active: new FormControl('', Validators.required),
        })

        this.displayModal = false

        if (changes.hasOwnProperty('wholesaler')) {
            this.form.get('codeWholesaler').setValue(this.wholesaler.codeWholesaler)
            this.form.get('codeAggregator').setValue(this.wholesaler.aggregator.codeAggregator)
            this.form.get('active').setValue(this.wholesaler.active)
            this.form.get('description').setValue(this.wholesaler.description)
        }

    }
    private updateTranslatedLabel() {
        this.translateService.get('WHOLESALER_UPDATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toaster.success(translation, this.translateService.instant('ERROR'));
        });
    }

    update() {
        this.formDisabled = true
        this.wholesalerService.update(
            this.wholesaler.codeWholesaler,
            this.form.get('codeWholesaler')?.value,
            this.form.get('codeAggregator')?.value,
            this.form.get('description')?.value,
            this.form.get('active')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    let wholesaler: Wholesaler = response.data as Wholesaler
                    this.router.navigate([`/wholesaler/${wholesaler.codeWholesaler}`])
                    this.formError = null
                    this.updateTranslatedLabel()
                    this.formDisabled = false
                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                this.formError = httpError.error.errors.message
                handleFormError(err as AppError, this.form);
                this.formDisabled = false
            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    changeAggregator($event: any) {
        this.form.get('codeAggregator')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }
}
