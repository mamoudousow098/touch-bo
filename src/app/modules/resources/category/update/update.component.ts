import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../commons/interfaces/category";
import {CategoryService} from "../../../../services/category.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {Permissions} from "../../../../commons/enums/Permissions";
import {BaseSimpleSupplier} from "../../../../commons/models/simple_suppliers";

@Component({
    selector: 'app-update-category',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateCategoryComponent implements OnChanges{

    form: FormGroup
    displayModal: any;
    @Input() category: Category
    @Input() codeFournisseur: string
    files: File[] = [];
    formDisabled = false
    Permissions = Permissions


    ngOnChanges(changes: SimpleChanges): void {
        this.form = new FormGroup({
            codeFournisseur: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
        })

        this.displayModal = false

        if (changes.hasOwnProperty('category')) {
            this.form.get('name').setValue(this.category.name)
        }
        if (changes.hasOwnProperty('codeFournisseur')) {
            this.form.get('codeFournisseur').setValue(this.codeFournisseur)
        }


    }

    constructor(private categoryService: CategoryService,
                private toastr: ToastrService,
                private router: Router,
                public keycloakService: KeycloakService
    ) {

        this.displayModal = false

    }


    update() {
        this.formDisabled = true
        this.categoryService.update(
            this.category.codeCategory,
            this.form.get('codeFournisseur')?.value,
            this.form.get('name')?.value,
            this.files,
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formDisabled = false
                    this.toastr.success('Category updated successfully', 'Success');
                    navigateBack(this.router)
                } else {
                    this.formDisabled = false
                    this.toastr.error('Category updated failed', 'Error');
                }
            },
            error: (err: AppError) => {
                this.formDisabled = false
                handleFormError(err, this.form)
            }
        })
    }
    onSelect($event: NgxDropzoneChangeEvent) {
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
