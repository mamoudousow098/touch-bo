import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../commons/interfaces/category";
import {ProductService} from "../../../../services/product.service";
import {SupplierService} from "../../../../services/supplier.service";
import {CategoryService} from "../../../../services/category.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {Product} from "../../../../commons/interfaces/product";
import {Permissions} from "../../../../commons/enums/Permissions";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {BaseSimpleWholesaler} from "../../../../commons/models/simple-wholesaler";
import {BaseSimpleCategory} from "../../../../commons/models/simple-category";

@Component({
  selector: 'app-update-product',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateProductComponent implements OnChanges{

    form: FormGroup
    displayModal: any;
    @Input() categories$: BaseSimpleCategory[] = []
    @Input() product: Product
    files: File[] = [];
    formDisabled = false
    Permissions = Permissions


    ngOnChanges(changes: SimpleChanges): void {
        this.form = new FormGroup({
            codeCategory: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
        })

        this.displayModal = false

        if (changes.hasOwnProperty('product')) {
            console.log("OUIIIIIIIIIIII",this.product);
            
            this.form.get('codeCategory').setValue(this.product.category.codeCategory)
            this.form.get('name').setValue(this.product.name)
            this.form.get('price').setValue(this.product.price)
            console.log(this.product);
            
        }

    }

    constructor(private productService: ProductService,
                private toastr: ToastrService,
                private router: Router,
                public keycloakService: KeycloakService
    ) {

        this.categories$ = []
        this.displayModal = false

    }


    update() {
        this.formDisabled = true
        this.productService.update(
            this.product.codeProduct,
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

    changeCategory($event: any) {
        this.form.get('codeCategory')?.setValue($event.target.value, {
            onlySelf: true,
        }
        )
    }



}
