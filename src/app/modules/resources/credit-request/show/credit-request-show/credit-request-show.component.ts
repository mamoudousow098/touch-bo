import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { Observable, share } from 'rxjs';
import { CreditRequestStatus } from 'src/app/commons/enums/CreditRequestStatus';
import { AppError } from 'src/app/commons/errors/app-error';
import { ForbiddenError } from 'src/app/commons/errors/forbidden-error';
import { UnprocessableEntityError } from 'src/app/commons/errors/unprocessable-entity-error';
import { handleFormError, navigateBack } from 'src/app/commons/helpers';
import { CreditRequest } from 'src/app/commons/interfaces/credit-request';
import { Response } from 'src/app/commons/models/response';
import { StageValidation } from 'src/app/interface/stage-validation';
import { ValidationOperation } from 'src/app/interface/validation-operation';
import { ValidationStage } from 'src/app/interface/validation-stage';
import { CreditRequestService } from 'src/app/services/credit-request.service';
import { ValidationStageService } from 'src/app/services/validation-stage.service';

@Component({
  selector: 'app-credit-request-show',
  templateUrl: './credit-request-show.component.html',
  styleUrls: ['./credit-request-show.component.css']
})
export class CreditRequestShowComponent implements OnInit{



  // get list validation stage operation for a credit request

  // get list validation stage for a specific wholesaler

  validationOperations$ : Observable<Response<ValidationOperation[]>>
  creditRequest$ : Observable<Response<CreditRequest>>
  validationForm : FormGroup
  token: string
  showValidateDialog = false
  showRejectDialog = false
  userInfo: any
  previousValidationStage$: Observable<Response<ValidationStage>>
  canValidate=false
  previousStage : ValidationStage


  constructor(private validationStageService: ValidationStageService,
    private route: ActivatedRoute,
    private creditRequestService: CreditRequestService,
    private translateService : TranslateService,
    private toastr: ToastrService,
    private router: Router,
    private keycloakService: KeycloakService){
      this.validationForm = new FormGroup({
        description: new FormControl('')
    })
    }
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')
    //this.token = '4ltFAJQ9us7V0LzdGfvq'
    this.validationOperations$ = this.validationStageService.getValidationOperations(this.token)
    this.creditRequest$=this.creditRequestService.show(this.token).pipe(share())
    

    // Check if the user is authenticated
    if (this.keycloakService.isLoggedIn()) {
      // Get Keycloak instance
      const keycloakInstance = this.keycloakService.getKeycloakInstance();

      // Access user attributes from the ID token
      this.userInfo = keycloakInstance.idTokenParsed;
      console.log(this.userInfo.profil);
      this.creditRequest$.subscribe({
        next: (response)=>{
          var creditRequest = response.data
          this.validationStageService.getFirstValidationStageByWholesaler(creditRequest.agent.wholesaler.codeWholesaler).subscribe({
              next: (stage)=> {
                if(creditRequest.validationStage){
                  console.log(creditRequest.validationStage.profil);
                  if(creditRequest.validationStage.previousStage != null){
                    this.previousValidationStage$ = this.validationStageService.getValidationStage(creditRequest.validationStage.previousStage).pipe(share())
                    this.previousValidationStage$.subscribe({
                      next: (response)=>{ 
                        console.log(response.data.profil);
                        this.previousStage = response.data
                        this.canValidate = (response.data.profil == this.userInfo.profil && response.data.codeWholesaler == this.userInfo.resource_code && creditRequest.status == CreditRequestStatus.pending)
                        
                      }
                    })
                  }
                }
                else{
                  this.previousStage = stage.data
                  console.log(this.previousStage.profil);
                  this.canValidate = (this.previousStage.profil == this.userInfo.profil && this.previousStage.codeWholesaler == this.userInfo.resource_code && creditRequest.status == CreditRequestStatus.pending)
                        
                }
                
                
              }
            })
        
          
          
        }
      })

      

      // Alternatively, you can access user attributes from the access token
      // this.userInfo = keycloakInstance.tokenParsed;
    }
  }

  validate(){
    console.log("here");
    
    this.stageValidation('VALIDATED')
    this.showValidateDialog = false
    
  }

  reject() {
    this.stageValidation('REJECTED')
    this.showRejectDialog = false
  }

  stageValidation(status: string){
    var validationStage : StageValidation    
    validationStage = {
      creditRequestToken: this.token,
      status: status,
      validationDescription: this.validationForm.get('description')?.value

    }
    const toastrRef = this.toastr.info('Operation in progress', 'Please wait...', {
      progressBar: true,
      timeOut: 0 // Disables auto close
    });
    this.creditRequestService.stageValidation(validationStage).subscribe({
      next: (response) => {
          if (response.statusCode == 200) {
            
            toastrRef.toastRef.close();
            this.updateTranslatedLabel()
            navigateBack(this.router)
          } else {
           
              //this.updateTranslatedLabelError(response.errors)
              console.log('error here', response.errors);
              
          }
      },
      error: (err:AppError) => {
        console.log(err);
        toastrRef.toastRef.close();
        if (err instanceof ForbiddenError) {
          this.updateTranslatedLabelError(err.errors.message)
        }
        if (err instanceof UnprocessableEntityError) {
          console.log("Error:",err.errors.message);
          
          this.updateTranslatedLabelError(err.errors.message)
        }
      }
  })
  
  }

  private updateTranslatedLabel() {
    this.translateService.get('Validation with success').subscribe((translation: string) => {
        // Display the translated success message
        this.toastr.success(translation, this.translateService.instant('SUCCESS'));
    });
}
private updateTranslatedLabelError(errorMessage: string) {
    this.translateService.get('Validation Failed').subscribe((translation: string) => {
        // Display the translated success message
        this.toastr.error(errorMessage, this.translateService.instant('Error'), {
          closeButton: true,
          progressBar: true,
          timeOut: 0
        });
    });
}

}
