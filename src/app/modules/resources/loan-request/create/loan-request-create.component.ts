import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Router} from "@angular/router";
import {LoanRequestService} from "../../../../services/loan-request.service";
import {LenderService} from "../../../../services/lender.service";
import {Lender} from "../../../../commons/interfaces/lender";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {map, Observable, share} from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-loan-request-create',
    templateUrl: './loan-request-create.component.html',
    styleUrls: ['./loan-request-create.component.css']
})
export class LoanRequestCreateComponent implements OnInit {
    displayModal: any;
    form: FormGroup
    formDisabled = false
    lenders$: Observable<Lender[]>

    @Input()
    codeWholesaler: string
    lenders: Lender[]

    Permissions = Permissions

    constructor(private loanRequestService: LoanRequestService,
                private wholesalerService: WholesalerService,
                private lenderService: LenderService,
                private router: Router,
                public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            codeLender: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required),
            recoveryPeriodInDays: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            recoveryAmountByPeriod: new FormControl('', Validators.required),
        })

        this.lenders = []
        this.displayModal = false
    }

    ngOnInit(): void {
        console.log(this.codeWholesaler);
        
        this.wholesalerService.show(this.codeWholesaler).pipe(share()).subscribe(
            response=>{
                console.log(response.data.creditAccount.currency);
                this.lenders$ = this.lenderService.getAllByCurrency(response.data.creditAccount.currency).pipe(map(response => response.data as Lender[]))
            }
        )
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    changeLender($event: any) {
        this.form.get('codeLender')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }

    create() {
        this.formDisabled = true
        this.loanRequestService.create(
            this.codeWholesaler,
            this.form.get('codeLender')?.value,
            this.form.get('amount')?.value,
            this.form.get('recoveryPeriodInDays')?.value,
            this.form.get('recoveryAmountByPeriod')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                navigateBack(this.router)
                this.formDisabled = false
            },
            error: (err: AppError) => {
                this.formDisabled = false
                handleFormError(err, this.form)
            }
        })
    }
}
