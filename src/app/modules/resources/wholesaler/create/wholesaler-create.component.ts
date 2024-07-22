import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {ToastrService} from "ngx-toastr";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-wholesaler-create',
    templateUrl: './wholesaler-create.component.html',
    styleUrls: ['./wholesaler-create.component.css']
})
export class WholesalerCreateComponent {
    form: FormGroup
    displayModal: any;
    @Input()
    aggregators$: Aggregator[]
    formDisabled = false
    Permissions = Permissions




    constructor(private wholesalerService: WholesalerService,
                private aggregatorService: AggregatorService,
                private toastr: ToastrService,
                private router: Router,
                public keycloakService: KeycloakService
                ) {
        this.form = new FormGroup({
            codeWholesaler: new FormControl('', Validators.required),
            codeAggregator: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.aggregators$ = []
        this.displayModal = false

    }


    create() {
        this.formDisabled = true
        this.wholesalerService.create(
            this.form.get('codeWholesaler')?.value,
            this.form.get('codeAggregator')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formDisabled = false
                    this.toastr.success('WholeSaler created successfully', 'Success');
                    navigateBack(this.router)
                } else {
                    this.formDisabled = false
                    this.toastr.error('WholeSaler created failed', 'Error');
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

    changeAggregator($event: any) {
        this.form.get('codeAggregator')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }

    changeLender($event: any) {
        this.form.get('codeLender')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }
}
