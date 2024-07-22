import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SupplierService} from "../../../../services/supplier.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {KeycloakService} from "keycloak-angular";
import {TranslateService} from "@ngx-translate/core";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {SystemCurrency} from "../../../../commons/enums/SystemCurrency";
import {CategoryService} from "../../../../services/category.service";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {Fournisseur} from "../../../../commons/interfaces/suplier";
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnChanges{

    form: FormGroup
    displayModal: boolean
    formDisabled = false;
    Permissions = Permissions
    files: File[] = [];
    @Input() codeFournisseur: string
    constructor(private categoryService: CategoryService, private router: Router,
                private toastr: ToastrService, public keycloakService: KeycloakService,
                private translateService:TranslateService
    ) {
        this.form = new FormGroup({
            codeCategory: new FormControl('', Validators.required),
            codeFournisseur: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            files: new FormControl('', Validators.required),

        })

        this.displayModal = false
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('codeFournisseur')) {
            this.form.get('codeFournisseur').setValue(this.codeFournisseur)
        }
    }
    private updateTranslatedLabel() {
        this.translateService.get('CATEGORY_CREATED_SUCCESSFULLY').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    private updateTranslatedLabelErr() {
        this.translateService.get('CATEGORY_CREATED_FAILED').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    
    create() {
        this.formDisabled = true
        this.categoryService.create(
            this.codeFournisseur+"_"+this.form.get('codeCategory')?.value,
            this.form.get('codeFournisseur')?.value,
            this.form.get('name')?.value,
            this.files,
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

    

}
