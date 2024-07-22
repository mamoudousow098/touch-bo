import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerProvisionService} from "../../../../services/wholesaler-provision.service";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {WholesalerProvision} from "../../../../commons/interfaces/wholesaler-provision";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-wholesaler-provision-validation',
    templateUrl: './wholesaler-provision-validation.component.html',
    styleUrls: ['./wholesaler-provision-validation.component.css']
})
export class WholesalerProvisionValidationComponent {
    @Input()
    provisionRequest: WholesalerProvision
    @Input()
    disabled: boolean
    form: FormGroup
    displayModal: boolean
    Permissions = Permissions

    constructor(private provisionRequestService: WholesalerProvisionService, private router: Router, public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            status: new FormControl('', Validators.required),
            creditAgentAccount: new FormControl(false)
        })

        this.displayModal = false
    }

    validate() {
        this.provisionRequestService.validate(this.provisionRequest.token, this.form.get('status')?.value, this.form.get('creditAgentAccount')?.value)
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

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    creditAgentAccount(event: any){
        if (event.target.checked) {
            this.form.get('creditAgentAccount')?.setValue(true)
        }
        if (!event.target.checked) {
            this.form.get('creditAgentAccount')?.setValue(false)
        }        
    }
}
