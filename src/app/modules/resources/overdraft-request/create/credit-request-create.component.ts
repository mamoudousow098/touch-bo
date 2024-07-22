import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {CreditRequestService} from "../../../../services/credit-request.service";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-credit-request-create',
    templateUrl: './credit-request-create.component.html',
    styleUrls: ['./credit-request-create.component.css']
})
export class CreditRequestCreateComponent {
    displayModal: any;
    form: FormGroup

    @Input()
    codeAgent: string
    Permissions = Permissions

    constructor(private creditRequestService: CreditRequestService, private router: Router, public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            amount: new FormControl('', Validators.required),
            recoveryPeriodInDays: new FormControl('', Validators.required),
            recoveryAmountByPeriod: new FormControl('', Validators.required),
        })

        this.codeAgent = ''
        this.displayModal = false
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    create() {
        this.creditRequestService.create(
            this.codeAgent,
            this.form.get('amount')?.value,
            this.form.get('recoveryPeriodInDays')?.value,
            this.form.get('recoveryAmountByPeriod')?.value,
        ).subscribe({
            next: (response) => {
                navigateBack(this.router)
            },
            error: (err: AppError) => handleFormError(err, this.form)
        })
    }
}
