import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderProvisionService} from "../../../../services/lender-provision.service";
import {Router} from "@angular/router";
import {navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {LenderProvision} from "../../../../commons/interfaces/lender-provision";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-lender-provision-validation',
    templateUrl: './lender-provision-validation.component.html',
    styleUrls: ['./lender-provision-validation.component.css']
})
export class LenderProvisionValidationComponent {
    @Input()
    provisionRequest: LenderProvision
    @Input()
    disabled: boolean
    form: FormGroup
    displayModal: boolean
    Permissions = Permissions

    constructor(private provisionRequestService: LenderProvisionService, private router: Router, public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            status: new FormControl('', Validators.required),
        })

        this.displayModal = false
    }

    validate() {
        this.provisionRequestService.validate(this.provisionRequest.token, this.form.get('status')?.value)
            .subscribe({
                next: (response) => {
                    navigateBack(this.router)
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
