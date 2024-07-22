import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {ProductService} from "../../../../services/product.service";
import {SupplierService} from "../../../../services/supplier.service";
import {CategoryService} from "../../../../services/category.service";
import {Fournisseur} from "../../../../commons/interfaces/suplier";
import {Category} from "../../../../commons/interfaces/category";
import { Permissions } from 'src/app/commons/enums/Permissions';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

    form: FormGroup
    displayModal: any;
    @Input() categories$: Category[]
    files: File[] = [];
    formDisabled = false
    Permissions = Permissions




    constructor(private productService: ProductService,
                private supplierService: SupplierService,
                private categoryService: CategoryService,
                private toastr: ToastrService,
                private router: Router,
                public keycloakService: KeycloakService
    ) {
        this.form = new FormGroup({
            codeProduct: new FormControl('', Validators.required),
            codeCategory: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            files: new FormControl(''),
        })

        this.categories$ = []
        this.displayModal = false

    }


    create() {
        this.formDisabled = true
        this.productService.create(
            this.form.get('codeProduct')?.value,
            this.form.get('codeCategory')?.value,
            this.form.get('name')?.value,
            this.form.get('price')?.value,
            this.files,
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formDisabled = false
                    this.toastr.success('Product created successfully', 'Success');
                    navigateBack(this.router)
                } else {
                    this.formDisabled = false
                    this.toastr.error('Product created failed', 'Error');
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
    toggleModal() {
        this.displayModal = !this.displayModal
    }

    changeCategory($event: any) {
        this.form.get('codeCategory')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }


}
