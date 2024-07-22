import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AggregatorService} from "../../../../services/aggregator.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError} from "../../../../commons/helpers";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import { Permissions } from 'src/app/commons/enums/Permissions';
import { KeycloakService } from 'keycloak-angular';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-aggregator-update',
    templateUrl: './aggregator-update.component.html',
    styleUrls: ['./aggregator-update.component.css']
})
export class AggregatorUpdateComponent implements OnInit {

    @Input()
    aggregator: Aggregator
    form: FormGroup
    displayModal: boolean
    formError: string | null = null;
    formDisabled = false
    Permissions = Permissions

    constructor(private aggregatorService: AggregatorService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService,
                private translateService : TranslateService
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            codeAggregator: new FormControl('', Validators.required),
            webhook: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.form.get('codeAggregator').setValue(this.aggregator.codeAggregator)
        this.form.get('webhook').setValue(this.aggregator.webhook)
        this.form.get('description').setValue(this.aggregator.description)

        this.displayModal = false
    }
    private updateTranslatedLabel() {
        this.translateService.get('AGGREGATOR_UPDATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    update() {
        this.formDisabled = true
        this.aggregatorService.update(
            this.aggregator.codeAggregator,
            this.form.get('webhook')?.value,
            this.form.get('description')?.value,
            this.form.get('codeAggregator')?.value,
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    let aggregator: Aggregator = response.data as Aggregator
                    this.formDisabled = false
                    this.router.navigate([`/aggregator/${aggregator.codeAggregator}`])
                    this.formError = null
                    this.updateTranslatedLabel()                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                this.formError = httpError.error.errors.message
                this.formDisabled = false
                handleFormError(err as AppError, this.form);
            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
