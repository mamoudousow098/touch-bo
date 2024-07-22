import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderService} from "../../../../services/lender.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Lender} from "../../../../commons/interfaces/lender";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-lender-update',
    templateUrl: './lender-update.component.html',
    styleUrls: ['./lender-update.component.css']
})
export class LenderUpdateComponent implements OnInit {
    @Input()
    lender: Lender
    form: FormGroup
    displayModal: boolean
    formError: string | null = null;
    formDisabled = false;
    Permissions = Permissions

    constructor(private lenderService: LenderService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService,
                private translateService : TranslateService
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            codeLender: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })
        this.form.get('codeLender').setValue(this.lender.codeLender)
        this.form.get('description').setValue(this.lender.description)
        this.displayModal = false
    }
    private updateTranslatedLabel() {
        this.translateService.get('LENDER_UPDATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    update() {
        this.formDisabled = true
        this.lenderService.update(
            this.lender.codeLender,
            this.form.get('codeLender')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formError = null;
                    this.updateTranslatedLabel()
                    this.formDisabled = false
                    navigateBack(this.router)
                }
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
