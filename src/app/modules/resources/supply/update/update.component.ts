import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AggregatorService} from "../../../../services/aggregator.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {KeycloakService} from "keycloak-angular";
import {TranslateService} from "@ngx-translate/core";
import {HttpErrorResponse} from "@angular/common/http";
import {AppError} from "../../../../commons/errors/app-error";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Fournisseur} from "../../../../commons/interfaces/suplier";
import {SupplierService} from "../../../../services/supplier.service";
import { Permissions } from 'src/app/commons/enums/Permissions';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateSupplierComponent implements OnInit, OnChanges {

    @Input()
    supplier: Fournisseur
    form: FormGroup
    displayModal: boolean
    formError: string | null = null;
    formDisabled = false
    Permissions = Permissions
    files: File[] = [];


    constructor(private supplierService: SupplierService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService,
                private translateService : TranslateService
    ) {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.form.get('name').setValue(this.supplier.name)
        console.log(this.supplier);
        
    }

    ngOnInit(): void {
        this.displayModal = false
    }
    private updateTranslatedLabel() {
        this.translateService.get('SUPPLIER_UPDATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    update() {
        this.formDisabled = true
        this.supplierService.update(
            this.form.get('name')?.value,
            this.supplier.codeFournisseur,
            this.files
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    let aggregator: Aggregator = response.data as Aggregator
                    this.formDisabled = false
                    navigateBack(this.router)
                    this.formError = null
                    this.updateTranslatedLabel()                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                this.formError = httpError.error.errors.message
                this.formDisabled = false
                handleFormError(err as AppError, this.form);
            }
        })
    }

    onSelect($event: NgxDropzoneChangeEvent) {
        this.files  = []
        console.log($event);
        this.files.push(...$event.addedFiles);
        console.log(this.form.value);
    }

    onRemove(file: File) {
        console.log(file);
        this.files.splice(this.files.indexOf(file), 1);
        console.log(this.form.value);


    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

}
