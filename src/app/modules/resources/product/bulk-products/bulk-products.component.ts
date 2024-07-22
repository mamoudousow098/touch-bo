import {Component, Input} from '@angular/core';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {ProductService} from "../../../../services/product.service";
import {CategoryService} from "../../../../services/category.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {Category} from "../../../../commons/interfaces/category";
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
  selector: 'app-bulk-products',
  templateUrl: './bulk-products.component.html',
  styleUrls: ['./bulk-products.component.css']
})
export class BulkProductsComponent {

    form: FormGroup;
    displayModal: any;
    @Input() categories$: Category[];
    Permissions = Permissions;
    formDisabled = false;

    constructor(private fb: FormBuilder,
                private productService: ProductService,
                private categoryService: CategoryService,
                private toastr: ToastrService,
                private router: Router,
                public keycloakService: KeycloakService) {
        this.form = this.fb.group({
            products: this.fb.array([])
        });
        this.categories$ = [];
        this.displayModal = false;
        this.addProduct();  // Start with one empty product form
    }

    get products() {
        return this.form.get('products') as FormArray;
    }

    newProduct(): FormGroup {
        return this.fb.group({
            codeProduct: ['', Validators.required],
            codeCategory: ['', Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
            files: [[], Validators.required]
        });
    }

    addProduct() {
        this.products.push(this.newProduct());
    }

    removeProduct(index: number) {
        this.products.removeAt(index);
    }

    create() {
        this.formDisabled = true;
        const productForms = this.form.value.products.map((product: any) => ({
            codeProduct: product.codeProduct,
            codeCategory: product.codeCategory,
            name: product.name,
            price: product.price,
            files: product.files
        }));

        this.productService.createBulk(productForms).subscribe({
            next: (response) => {
                this.formDisabled = false;
                if (response.statusCode == 200) {
                    this.toastr.success('Products created successfully', 'Success');
                    navigateBack(this.router);
                } else {
                    this.toastr.error('Products creation failed', 'Error');
                }
            },
            error: (err: AppError) => {
                this.formDisabled = false;
                handleFormError(err, this.form);
            }
        });
    }

    onSelect(event: NgxDropzoneChangeEvent, index: number) {
        const productForm = this.products.at(index);
        const files = productForm.get('files') as FormArray;
        files.setValue(event.addedFiles);
    }

    onRemove(file: File, index: number) {
        const productForm = this.products.at(index);
        const files = productForm.get('files') as FormArray;
        files.setValue(files.value.filter((f: File) => f !== file));
    }

    toggleModal() {
        this.displayModal = !this.displayModal;
    }

    changeCategory(event: any, index: number) {
        const productForm = this.products.at(index);
        productForm.get('codeCategory')?.setValue(event.target.value, {
            onlySelf: true,
        });
    }

}
