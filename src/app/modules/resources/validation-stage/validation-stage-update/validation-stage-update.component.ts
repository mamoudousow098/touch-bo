import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { navigateBack, handleFormError } from 'src/app/commons/helpers';
import { Response } from 'src/app/commons/models/response';
import { ValidationStage } from 'src/app/interface/validation-stage';
import { ValidationStageService } from 'src/app/services/validation-stage.service';

@Component({
  selector: 'app-validation-stage-update',
  templateUrl: './validation-stage-update.component.html',
  styleUrls: ['./validation-stage-update.component.css']
})
export class ValidationStageUpdateComponent {

  form: FormGroup
  displayModal: boolean
  formDisabled = false

  protected readonly Object = Object;
  Permissions = Permissions;
  @Input() validationStage: ValidationStage;
  codeValidationStage : string;

  validationStages$ : Observable<Response<ValidationStage[]>>;

  constructor(private validationStageService: ValidationStageService, private router: Router, public keycloakService: KeycloakService) {
      this.form = new FormGroup({
          profil: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          antecedentStage: new FormControl(''),
          previousStage: new FormControl(''),
      })

      
      this.displayModal = false
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Validation stage update",this.validationStage);
    
    this.form.get('profil')?.setValue(this.validationStage?.profil),
    this.form.get('description')?.setValue(this.validationStage?.description),
    this.form.get('antecedentStage')?.setValue(this.validationStage?.antecedentStage),
    this.form.get('previousStage')?.setValue(this.validationStage?.previousStage),    


    this.codeValidationStage = this.validationStage?.codeValidationStage
    this.validationStages$ = this.validationStageService.getAllValidationStage(this.validationStage?.codeWholesaler)

  }


  update() {
      this.formDisabled = true
      if(this.form.get('antecedentStage').value == null){
        this.form.get('antecedentStage').setValue("")
      }
      if(this.form.get('previousStage').value == null){
        this.form.get('previousStage').setValue("")
      }
      this.validationStageService.update(this.codeValidationStage,{
          profil: this.form.get('profil').value,
          description: this.form.get('description').value,
          antecedentValidationStageCode: this.form.get('antecedentStage').value,
          previousValidtionStageCode: this.form.get('previousStage').value,
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
