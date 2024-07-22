import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { OperationType } from 'src/app/commons/enums/OperationType';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { navigateBack, handleFormError } from 'src/app/commons/helpers';
import { CommissionPlan, CommissionPlanUpdate } from 'src/app/commons/interfaces/commission-plan';
import { Response } from 'src/app/commons/models/response';
import { CommissionPlanService } from 'src/app/services/commission-plan.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnChanges{
  form: FormGroup
  displayModal: boolean
  formDisabled = false

  protected readonly Object = Object;
  Permissions = Permissions;
  @Input() commissionPlan: CommissionPlan;
  commissionPlanId : number;

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
      })

      
      this.displayModal = false
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.form.get('startAmount')?.setValue(this.commissionPlan?.startAmount),
    this.form.get('endAmount')?.setValue(this.commissionPlan?.endAmount),
    this.form.get('feesFix')?.setValue(this.commissionPlan?.feesFix),
    this.form.get('feesPercentage')?.setValue(this.commissionPlan?.feesPercentage),
    this.form.get('commissionAggregator')?.setValue(this.commissionPlan?.commissionAggregator),
    this.form.get('commissionWholesaler')?.setValue(this.commissionPlan?.commissionWholesaler),
    this.form.get('commissionLender')?.setValue(this.commissionPlan?.commissionLender),
    this.form.get('commissionSystem')?.setValue(this.commissionPlan?.commissionSystem)

    this.commissionPlanId = this.commissionPlan?.id
  }


  update() {
      this.formDisabled = true
      this.commissionPlanService.update(this.commissionPlanId,{
          startAmount: this.form.get('startAmount').value,
          endAmount: this.form.get('endAmount').value,
          feesFix: this.form.get('feesFix').value,
          feesPercentage: this.form.get('feesPercentage').value,
          commissionAggregator: this.form.get('commissionAggregator').value,
          commissionWholesaler: this.form.get('commissionWholesaler').value,
          commissionLender: this.form.get('commissionLender').value,
          commissionSystem: this.form.get('commissionSystem').value,
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
