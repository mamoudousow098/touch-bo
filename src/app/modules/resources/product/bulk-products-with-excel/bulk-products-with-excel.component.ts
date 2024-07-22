import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../commons/interfaces/category";
import {ProductService} from "../../../../services/product.service";
import {CategoryService} from "../../../../services/category.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import * as XLSX from "xlsx";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {ApiResponse} from "../../../../commons/interfaces/api-response";
import {Permissions} from "../../../../commons/enums/Permissions";
import {SupplierService} from "../../../../services/supplier.service";
import {Fournisseur} from "../../../../commons/interfaces/suplier";

@Component({
  selector: 'app-bulk-products-with-excel',
  templateUrl: './bulk-products-with-excel.component.html',
  styleUrls: ['./bulk-products-with-excel.component.css']
})
export class BulkProductsWithExcelComponent {

    uploadedFile: File | null = null;
    @ViewChild('fileInput') fileInput: any;
    form: FormGroup;
    displayModal: any;
    @Input() suppliers$: Fournisseur[];
    Permissions = Permissions;
    formDisabled = false;
    @ViewChild('submitBtn')
    submitBtn: ElementRef;

    constructor(private fb: FormBuilder,
                private productService: ProductService,
                private supplierService: SupplierService,
                private toastr: ToastrService,
                private router: Router,
                public keycloakService: KeycloakService) {
        this.form = this.fb.group({
            products: this.fb.array([]),
            codeFournisseur: ['', Validators.required]
        });
        this.suppliers$ = [];
        this.displayModal = false;
        // Load categories on component initialization
    }

    get products() {
        return this.form.get('products') as FormArray;
    }

    newProduct(): FormGroup {
        return this.fb.group({
            codeProduct: ['', Validators.required],
            codeFournisseur: ['', Validators.required],
            codeCategory: ['', Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
        });
    }


    changeSupplier($event: any) {
        this.form.get('codeFournisseur')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }

    create() {

        this.formDisabled = true;
        const codeFournisseur = this.form.get('codeFournisseur')?.value;
        const productForms = this.form.value.products.map((product: any) => ({
            codeProduct: product.codeProduct,
            codeFournisseur: codeFournisseur,
            codeCategory: product.codeCategory,
            name: product.name,
            price: product.price,
        }));

        this.productService.createBulkExcel(productForms).subscribe({

            next: (response) => {
                console.log("productForms");
                console.log(productForms);
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


    handleFileInput(event: NgxDropzoneChangeEvent) {
        const files = event.addedFiles;
        if (files.length !== 1) throw new Error('Cannot use multiple files');
        this.uploadedFile = files[0];
        const file = files[0];
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            const sheetNames = wb.SheetNames; // Array of sheet names

            sheetNames.forEach(sheetName => {
                const ws: XLSX.WorkSheet = wb.Sheets[sheetName];
                console.log(`Sheet name: ${sheetName}`);

                // Convert the sheet into a data array
                const data: any[][] = <any[][]>XLSX.utils.sheet_to_json(ws, { header: 1 });

                // If the data array is empty, exit the loop
                if (data.length === 0) return;

                // Assuming the first row contains column headers
                const headers = data[0];
                const designationIndex = headers.indexOf('DESIGNATION');
                const referenceIndex = headers.indexOf('REFERENCES');
                const prixIndex = headers.indexOf('PRIX ');

                // Loop through the data rows starting from the second row
                for (let i = 1; i < data.length; i++) {
                    const row = data[i];
                    const product = this.newProduct();

                    // Fill the product fields with values from the corresponding row
                    if (designationIndex !== -1) product.get('name')?.setValue(row[designationIndex]);
                    if (referenceIndex !== -1) product.get('codeProduct')?.setValue(row[referenceIndex]);
                    if (prixIndex !== -1) product.get('price')?.setValue(row[prixIndex]);

                    // Set the category code based on the sheet name
                    product.get('codeCategory')?.setValue(sheetName);

                    // Add the product to the form
                    this.products.push(product);
                    console.log("Données du produit récupérées depuis Excel :", product.value);
                }
            });

            console.log("eh broh nous sommes là");
        };
        reader.readAsBinaryString(this.uploadedFile);
    }

    toggleModal() {
        this.displayModal = !this.displayModal;
    }

}
