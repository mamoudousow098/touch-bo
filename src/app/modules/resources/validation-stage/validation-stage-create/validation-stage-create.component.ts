import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { OperationType } from 'src/app/commons/enums/OperationType';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { navigateBack, handleFormError } from 'src/app/commons/helpers';
import { Response } from 'src/app/commons/models/response';
import { ValidationStage } from 'src/app/interface/validation-stage';
import { CommissionPlanService } from 'src/app/services/commission-plan.service';
import { ValidationStageService } from 'src/app/services/validation-stage.service';

@Component({
  selector: 'app-validation-stage-create',
  templateUrl: './validation-stage-create.component.html',
  styleUrls: ['./validation-stage-create.component.css']
})
export class ValidationStageCreateComponent implements OnChanges{
    form: FormGroup
    displayModal: boolean
    formDisabled = false


    @Input()
    codeWholesaler: string

    protected readonly OperationType = OperationType;
    protected readonly Object = Object;
    Permissions = Permissions;
    validationStages$ : Observable<Response<ValidationStage[]>>;


    constructor(private validationStageService: ValidationStageService, private router: Router, public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            codeValidationStage: new FormControl('', Validators.required),
            profil: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            antecedentStage: new FormControl(''),
            previousStage: new FormControl('')
          })

          // Set default value
            this.form.get('antecedentStage').setValue('');
            this.form.get('previousStage').setValue('');

        this.displayModal = false
        
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.validationStages$ = this.validationStageService.getAllValidationStage(this.codeWholesaler)
        
    }


    create() {
        this.formDisabled = true
        this.validationStageService.create({
            codeValidationStage: this.form.get('codeValidationStage').value,
            profil: this.form.get('profil').value,
            description: this.form.get('description').value,
            antecedentValidationStageCode: this.form.get('antecedentStage').value,
            previousValidationStageCode: this.form.get('previousStage').value,
            wholesalerCode: this.codeWholesaler
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

    onAntecedentStageChange(event: any) {
        this.form.get('antecedentStage').setValue(event.target.value)
      }
    
      onPreviousStageChange(event: any) {
        this.form.get('previousStage').setValue(event.target.value)
      }

}
