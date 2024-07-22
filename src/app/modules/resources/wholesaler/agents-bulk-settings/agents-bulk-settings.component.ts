import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {HttpErrorResponse} from "@angular/common/http";
import {AppError} from "../../../../commons/errors/app-error";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AgentService } from 'src/app/services/agent.service';
import { Observable, share } from 'rxjs';
import { ApiResponse } from 'src/app/commons/interfaces/api-response';
import { Response } from 'src/app/commons/models/response';

@Component({
    selector: 'app-agents-bulk-settings',
    templateUrl: './agents-bulk-settings.component.html',
    styleUrls: ['./agents-bulk-settings.component.css']
})
export class AgentsBulkSettingsComponent implements OnChanges, OnInit {

    @Input()
    wholesaler: Wholesaler
    agent: Agent
    form: FormGroup
    displayModal: any;
    formError: string | null = null;
    formDisabled = false
    Permissions = Permissions
    agents$: Observable<Response<Agent[]>>
    selectedAgents: string[] = []


    constructor(
        private wholesalerService: WholesalerService, private router: Router,
        private toastr: ToastrService,
        public keycloakService: KeycloakService,
        private agentSservice: AgentService) {
    }

    ngOnInit(){
        this.agents$ = this.agentSservice.getAllList("", "", this.wholesaler.codeWholesaler).pipe(share())
    }

    ngOnChanges(changes: SimpleChanges) {
        this.form = new FormGroup({
            selectedAgents: new FormControl([]),
            overdraftMaxDailyCount: new FormControl('', Validators.required),
            overdraftLimitAmount: new FormControl('', Validators.required),
            penaltyDelayInDays: new FormControl('', Validators.required),
            overdraftBillingOccurrence: new FormControl('', Validators.required),
            maxCreditRequestAmount: new FormControl(''),
        })

        if (changes.hasOwnProperty('wholesaler')) {
            this.form.get('overdraftMaxDailyCount').setValue(this.agent?.overdraftMaxDailyCount)
            this.form.get('overdraftLimitAmount').setValue(this.agent?.overdraftLimitAmount)
            this.form.get('penaltyDelayInDays').setValue(this.agent?.penaltyDelayInDays)
            this.form.get('overdraftBillingOccurrence').setValue(this.agent?.overdraftBillingOccurrence)
            this.form.get('maxCreditRequestAmount').setValue(this.agent?.maxCreditRequestAmount)

        }
        this.displayModal = false
    }

    update() {
        this.formDisabled = true
        this.wholesalerService.bulkSettings(
            this.wholesaler?.codeWholesaler,
            this.selectedAgents,
            this.form.get('overdraftMaxDailyCount')?.value,
            this.form.get('overdraftLimitAmount')?.value,
            this.form.get('overdraftBillingOccurrence')?.value,
            this.form.get('penaltyDelayInDays')?.value,
            this.form.get('maxCreditRequestAmount')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formError = null
                    this.toastr.success('Customers updated successfully', 'Success');
                    navigateBack(this.router)
                    this.formDisabled = false
                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                this.formError = httpError.error.errors.message
                console.log(this.formError);
                handleFormError(err as AppError, this.form);
                this.formDisabled = false
            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    onAgentsSelect(codeAgent: string, event: any){
        console.log(codeAgent);
        if (event.target.checked) {
            this.selectedAgents.push(codeAgent)
            
        }
        if (!event.target.checked) {
            const index = this.selectedAgents.findIndex(x=> x==codeAgent)
            this.selectedAgents.splice(index,1)
        }
        console.log(this.selectedAgents);
        
        
    }

    selectAllAgent(event: any){
        if (event.target.checked) {
            this.agents$.subscribe({
                next: (response)=> {
                    this.selectedAgents = response.data.map(agent=> agent.codeAgent)
                    console.log(this.selectedAgents);
                }
            })
        }
        if (!event.target.checked) {
            this.selectedAgents = []
            console.log(this.selectedAgents);
        }
        
        
        
    }

    check(agent: Agent): boolean{
        return this.selectedAgents.some(item=>item==agent.codeAgent)
    }

    IsAllChecked(agents: Agent[]): boolean{
        console.log(this.selectedAgents.length == agents.map(agent=>agent.codeAgent).length, this.selectedAgents, agents.map(agent=>agent.codeAgent));
        
        return this.selectedAgents.length == agents.map(agent=>agent.codeAgent).length
    }
}
