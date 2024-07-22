import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {SimpleWholesaler} from "../../../../commons/interfaces/simple-wholesaler";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {ToastrService} from 'ngx-toastr';
import {KeycloakService} from "keycloak-angular";
import { Permissions } from 'src/app/commons/enums/Permissions';
import {WholesalerService} from "../../../../services/wholesaler.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-agent-create',
    templateUrl: './agent-create.component.html',
    styleUrls: ['./agent-create.component.css']
})
export class AgentCreateComponent {
    @Input()
    wholesalers: SimpleWholesaler[]
    form: FormGroup
    displayModal: any;
    formDisabled = false
    Permissions = Permissions
    filteredWholesalers : SimpleWholesaler[]

    constructor(private agentService: AgentService,
                private toastr: ToastrService,
                private router: Router,
                private wholesalerService: WholesalerService,
                public keycloakService: KeycloakService,
                private translateService : TranslateService) {

        this.form = new FormGroup({
            codeAgent: new FormControl('', Validators.required),
            codeWholesaler: new FormControl('', Validators.required),
            overdraftMaxDailyCount: new FormControl('', Validators.required),
            overdraftLimitAmount: new FormControl('', Validators.required),
            overdraftBillingOccurrence: new FormControl('', Validators.required),
            maxCreditRequestAmount: new FormControl(''),
            penaltyDelayInDays: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        console.log(keycloakService.isUserInRole(Permissions.STORE_AGENT))
        this.displayModal = false
    }

    search = {
        codeWholesalers: '',
        codeAggregator: '',
    }
    create() {
        this.formDisabled = true
        this.agentService.create(
            this.form.get('codeAgent')?.value,
            this.form.get('codeWholesaler')?.value,
            this.form.get('codeWholesalers')?.value,
            this.form.get('description')?.value,
            this.form.get('overdraftMaxDailyCount')?.value,
            this.form.get('overdraftLimitAmount')?.value,
            this.form.get('overdraftBillingOccurrence')?.value,
            this.form.get('maxCreditRequestAmount')?.value,
            this.form.get('penaltyDelayInDays')?.value,
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.updateTranslatedLabel()
                    navigateBack(this.router)
                    this.formDisabled = false
                } else {
                    this.updateTranslatedLabelError();
                }
            },
            error: (err: AppError) => {
                handleFormError(err, this.form);
                this.formDisabled = false
            }
        });
    }
    private updateTranslatedLabel() {
        this.translateService.get('CUSTOMER_CREATED_SUCCESS_MESSAGE').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    private updateTranslatedLabelError() {
        this.translateService.get('CUSTOMER_CREATED_FAILED').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('Error'));
        });
    }
    toggleModal() {
        this.displayModal = !this.displayModal;
        if (this.displayModal) {
            this.loadAllWholesalers();
        }
    }

  changeWholesaler(codeWholesaler: any) {
        this.form.get('codeWholesaler')?.setValue(codeWholesaler, {
            onlySelf: true,
        })
      this.filteredWholesalers = []
    }
    onCodeWholesalerChange(value: any) {
        console.log("Lii lanla: ", value.target.value);
        this.search.codeWholesalers = value;
        this.wholesalerService.getAll(value.target.value).subscribe({
            next: response=> this.filteredWholesalers = response.data
        })
    }
    loadAllWholesalers() {
        this.wholesalerService.getAll('').subscribe({
            next: response => this.filteredWholesalers = response.data
        });
    }
}
