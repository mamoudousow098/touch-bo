import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {KeycloakService} from "keycloak-angular";
import {TranslateService} from "@ngx-translate/core";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {SystemCurrency} from "../../../../commons/enums/SystemCurrency";
import {SupplierService} from "../../../../services/supplier.service";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import { Permissions } from 'src/app/commons/enums/Permissions';
import { Aggregator } from 'src/app/commons/interfaces/aggregator';
import { AggregatorService } from 'src/app/services/aggregator.service';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/commons/interfaces/api-response';

@Component({
  selector: 'app-create-suplier',
  templateUrl: './create-suplier.component.html',
  styleUrls: ['./create-suplier.component.css']
})
export class CreateSuplierComponent {

    form: FormGroup
    displayModal: boolean
    formDisabled = false;
    Permissions = Permissions
    files: File[] = [];
    aggregators$: Observable<ApiResponse>

    constructor(private supplierService: SupplierService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService,
                private translateService:TranslateService,
                private aggregatorService: AggregatorService
    ) {
        this.form = new FormGroup({
            codeFournisseur: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            codeAggregator: new FormControl('', Validators.required),
            files: new FormControl('', Validators.required),

        })

        this.displayModal = false
        this.aggregators$ = aggregatorService.getAll()
    }
    onSelect($event: NgxDropzoneChangeEvent) {
        console.log($event);
        this.form.get('files').setValue($event.addedFiles)
        this.files.push(...$event.addedFiles);
        console.log(this.form.value);
    }

    onRemove(file: File) {
        console.log(file);
        this.files.splice(this.files.indexOf(file), 1);
        this.form.get('files').setValue('')
        console.log(this.form.value);


    }
    private updateTranslatedLabel() {
        this.translateService.get('SUPPLIER_CREATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    private updateTranslatedLabelErr() {
        this.translateService.get('SUPPLIER_CREATED_FAILED').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    create() {
        this.formDisabled = true
        this.supplierService.create(
            this.form.get('codeFournisseur')?.value,
            this.form.get('name')?.value,
            this.files,
            this.form.get('codeAggregator')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.updateTranslatedLabel()
                    this.formDisabled = false
                    navigateBack(this.router)
                } else {
                    this.updateTranslatedLabelErr();
                    this.formDisabled = false
                }
            },
            error: (err: AppError) => {
                handleFormError(err, this.form);
                this.formDisabled = false
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
}
