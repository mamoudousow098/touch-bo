import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError} from "../../../../commons/helpers";
import {Agent} from "../../../../commons/interfaces/agent";
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import {BaseSimpleWholesaler} from "../../../../commons/models/simple-wholesaler";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-agent-update',
    templateUrl: './agent-update.component.html',
    styleUrls: ['./agent-update.component.css']
})
export class AgentUpdateComponent implements OnChanges {
    @Input()
    wholesalers: BaseSimpleWholesaler[] = []
    @Input()
    agent: Agent
    form: FormGroup
    displayModal: any;
    formError: string | null = null;
    formDisabled = false
    Permissions = Permissions


    constructor(private agentService: AgentService,
                private router: Router,
                private toastr: ToastrService,
                public keycloakService: KeycloakService,
                private translateService: TranslateService) {
    }


    ngOnChanges(changes: SimpleChanges) {
        this.form = new FormGroup({
            codeAgent: new FormControl('', Validators.required),
            codeWholesaler: new FormControl('', Validators.required),
            overdraftMaxDailyCount: new FormControl('', Validators.required),
            overdraftLimitAmount: new FormControl('', Validators.required),
            overdraftBillingOccurrence: new FormControl('', Validators.required),
            overdraftCountRefresh: new FormControl('', Validators.required),
            maxCreditRequestAmount: new FormControl(''),
            penaltyDelayInDays: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            active: new FormControl('', Validators.required)
        })

        if (changes.hasOwnProperty('agent')) {
            this.form.get('codeWholesaler').setValue(this.agent?.wholesaler.codeWholesaler)
            this.form.get('codeAgent').setValue(this.agent?.codeAgent)
            this.form.get('description').setValue(this.agent?.description)
            this.form.get('overdraftMaxDailyCount').setValue(this.agent?.overdraftMaxDailyCount)
            this.form.get('overdraftLimitAmount').setValue(this.agent?.overdraftLimitAmount)
            this.form.get('overdraftBillingOccurrence').setValue(this.agent?.overdraftBillingOccurrence)
            this.form.get('overdraftCountRefresh').setValue(this.agent?.overdraftCountRefresh)
            this.form.get('maxCreditRequestAmount').setValue(this.agent?.maxCreditRequestAmount)
            this.form.get('penaltyDelayInDays').setValue(this.agent?.penaltyDelayInDays)
            this.form.get('active').setValue(this.agent?.active)
        }
        this.displayModal = false
    }

    update() {
        this.formDisabled = true
        this.agentService.update(
            this.agent.codeAgent,
            this.form.get('codeWholesaler')?.value,
            this.form.get('codeAgent')?.value,
            this.form.get('description')?.value,
            this.form.get('overdraftMaxDailyCount')?.value,
            this.form.get('overdraftLimitAmount')?.value,
            this.form.get('overdraftBillingOccurrence')?.value,
            this.form.get('overdraftCountRefresh')?.value,
            this.form.get('maxCreditRequestAmount')?.value,
            this.form.get('penaltyDelayInDays')?.value,
            this.form.get('active')?.value,
        ).subscribe({

            next: (response) => {
                if (response.statusCode == 200) {
                    let agent: Agent = response.data as Agent

                    this.router.navigate([`/agent/${agent.codeAgent}`])
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
    private updateTranslatedLabel() {
        this.translateService.get('CUSTOMER_UPDATED_SUCCESS_MESSAGE').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    changeWholesaler($event: any) {
        this.form.get('codeWholesaler')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
