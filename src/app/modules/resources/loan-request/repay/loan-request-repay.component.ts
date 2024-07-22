import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoanRequestService} from "../../../../services/loan-request.service";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-loan-request-repay',
    templateUrl: './loan-request-repay.component.html',
    styleUrls: ['./loan-request-repay.component.css']
})
export class LoanRequestRepayComponent {

    @Input()
    token: string

    @Input()
    disabled: boolean

    form: FormGroup
    displayModal: boolean
    Permissions = Permissions

    constructor(private loanRequestService: LoanRequestService, private router: Router, public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            amount: new FormControl('', Validators.required),
        })

        this.token = ''
        this.displayModal = false
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    repay() {
        this.loanRequestService.repay(this.token, this.form.get('amount')?.value)
            .subscribe({
                next: (response) => {
                    navigateBack(this.router)
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])

                    handleFormError(err, this.form)
                }
            })

    }
}
