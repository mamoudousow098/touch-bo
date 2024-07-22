import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommissionPlanService} from "../../../../services/commission-plan.service";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {OperationType} from "../../../../commons/enums/OperationType";
import {Permissions} from "../../../../commons/enums/Permissions"
import {KeycloakService} from "keycloak-angular";

@Component({
    selector: 'app-commission-plan-create',
    templateUrl: './commission-plan-create.component.html',
    styleUrls: ['./commission-plan-create.component.css']
})
export class CommissionPlanCreateComponent {
    form: FormGroup
    displayModal: boolean
    formDisabled = false


    @Input()
    code: string

    @Input()
    type: string

    protected readonly OperationType = OperationType;
    protected readonly Object = Object;
    Permissions = Permissions;

    constructor(private commissionPlanService: CommissionPlanService, private router: Router, public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            startAmount: new FormControl('', Validators.required),
            endAmount: new FormControl('', Validators.required),
            feesFix: new FormControl('', Validators.required),
            feesPercentage: new FormControl('', Validators.required),
            commissionAggregator: new FormControl('', Validators.required),
            commissionWholesaler: new FormControl('', Validators.required),
            commissionLender: new FormControl('', Validators.required),
            commissionSystem: new FormControl('', Validators.required),
            operationType: new FormControl('', Validators.required)
        })

        this.displayModal = false
    }

    create() {
        this.formDisabled = true
        this.commissionPlanService.create({
            startAmount: this.form.get('startAmount').value,
            endAmount: this.form.get('endAmount').value,
            feesFix: this.form.get('feesFix').value,
            feesPercentage: this.form.get('feesPercentage').value,
            commissionAggregator: this.form.get('commissionAggregator').value,
            commissionWholesaler: this.form.get('commissionWholesaler').value,
            commissionLender: this.form.get('commissionLender').value,
            commissionSystem: this.form.get('commissionSystem').value,
            operationType: this.form.get('operationType').value,
            resourceType: this.type,
            resourceCode: this.code
        }).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formDisabled = false
                    navigateBack(this.router)
                }
            },
            error: (err: AppError) => {
                this.formDisabled = false
                handleFormError(err, this.form)
            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
