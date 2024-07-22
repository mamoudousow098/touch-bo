import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {CreditRequestService} from "../../../../services/credit-request.service";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';

@Component({
    selector: 'app-credit-request-create',
    templateUrl: './credit-request-create.component.html',
    styleUrls: ['./credit-request-create.component.css']
})
export class CreditRequestCreateComponent implements OnChanges {
    displayModal: any;
    form: FormGroup
    Permissions = Permissions

    @Input()
    codeAgent: string
    protected readonly CreditRequestType = CreditRequestType;
    protected readonly Object = Object;

    constructor(private creditRequestService: CreditRequestService, private router: Router, public keycloakService:KeycloakService) {
        this.form = new FormGroup({
            amount: new FormControl('', Validators.required),
            recoveryPeriodInDays: new FormControl(''),
            recoveryAmountByPeriod: new FormControl(''),
            creditType: new FormControl('', Validators.required),
        })
        console.log("code agent" + this.codeAgent);
    
        this.displayModal = false
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.codeAgent);
        
    }



    toggleModal() {
        this.displayModal = !this.displayModal
    }

    initiateNanoCredit() {
        this.creditRequestService.initiateNanoCredit(
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

    storeOverdraft() {
        this.creditRequestService.storeOverdraft(
            this.codeAgent,
            this.form.get('amount')?.value
        ).subscribe({
            next: (response) => {
                navigateBack(this.router)
            },
            error: (err: AppError) => handleFormError(err, this.form)
        })
    }

    onSubmit(){
        if(this.form.get('creditType')?.value == CreditRequestType.NanoCredit){
            this.initiateNanoCredit()
        }
        if (this.form.get('creditType')?.value == CreditRequestType.Overdraft) {
            this.storeOverdraft()
        }
    }
}
