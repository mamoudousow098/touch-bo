import {Component, Input, OnInit} from '@angular/core';
import {Observable, share} from "rxjs";
import {Response} from "../../../../commons/models/response";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../../commons/services/breadcrumb.service";
import Swal from "sweetalert2";
import {navigateBack} from "../../../../commons/helpers";
import {Fournisseur} from "../../../../commons/interfaces/suplier";
import {Category} from "../../../../commons/interfaces/category";
import {SupplierService} from "../../../../services/supplier.service";
import {CategoryService} from "../../../../services/category.service";
import {ProductService} from "../../../../services/product.service";
import {data} from "autoprefixer";
import {Product} from "../../../../commons/interfaces/product";
import { Permissions } from 'src/app/commons/enums/Permissions';
import {AppError} from "../../../../commons/errors/app-error";
import {MediaService} from "../../../../services/media.service";
import {OperationType} from "../../../../commons/enums/OperationType";
import { Media } from 'src/app/commons/interfaces/media';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

    products$: Observable<Response<PaginatedResource<Product>>>
    suppliers$: Observable<Response<Fournisseur[]>>
    categories$: Observable<Response<Category[]>>
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Code Wholesaler', 'Description', 'Code Aggregator', 'Commission Account Balance', 'Credit Account Balance', 'Is active', 'Date creation'];
    exportFileName: string = 'Aggregators';
    mediaUrls: string[] = []; // This will hold the URLs of the media to display in the modal
    currentIndex: number = 0;

    search = {
        codeProduct: '',
        codeCategory: '',
        token:''
    }

    items: Breadcrumb[] = [
        {label: "Products"}
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    protected readonly data = data;
    Permissions = Permissions
    private token: string;
    mediaUrl: string;
    mediaUrl$: Observable<string>;
    displayModal: boolean = false;
    openModal() {
        this.displayModal = true; // Open the modal
    }


    constructor(public keycloakService: KeycloakService,
                private supplierService: SupplierService,
                private categoryService: CategoryService,
                private mediaService: MediaService,
                private router: Router, private breadcrumbService: BreadcrumbService,
                private productService: ProductService) {
    }

    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        this.goToPage()
        this.suppliers$ = this.supplierService.getAll().pipe(share())
        this.categories$ = this.categoryService.getAll().pipe(share())
        this.initExportData();

    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.productService.getAll(this.search.codeProduct,this.search.codeCategory)
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: Wholesaler) => [data.codeWholesaler, data.description, data.aggregator.codeAggregator, data.commissionAccount?.balance, data.creditAccount?.balance, data.active, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.products$ = this.productService.getPage(this.search.codeProduct, this.search.codeCategory, page).pipe(share())
    }



    onCategoryChange(event: any) {
        this.search.codeCategory = event.target.value;
        this.goToPage()
    }
    onCodeProductChange(value: any) {
        this.search.codeProduct = value.target.value;
        this.goToPage();

    }

    confirmDelete(codeAgent: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this customer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.value) {
                // Call your delete function here
                this.delete(codeAgent);
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your item is safe :)', 'error');
            }
        });
    }

    delete(codeWholesaler: string) {
        this.productService.delete(codeWholesaler).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {
            }
        })
    }
    viewMedia(media: Media[]) {
        this.mediaUrls =  media.map((media:Media)=> media.urlMedia)
        this.openModal();
    }

    getMedia(token: string) {
        console.log("Waaw manleu kayy");
        this.mediaService.getAll(token).subscribe({
            next: (response: any) => {
                this.mediaUrls = response.data; // Assuming response.data is an array of URLs
                console.log("pousseul");
                console.log(this.mediaUrls);
            },
            error: (err: any) => {
                // Handle error here if needed
            }
        });
    }

    nextImage() {
        // Move to the next image
        this.currentIndex = (this.currentIndex + 1) % this.mediaUrls.length;
    }

    previousImage() {
        // Move to the previous image
        this.currentIndex = (this.currentIndex - 1 + this.mediaUrls.length) % this.mediaUrls.length;
    }







    toggleModal() {
        this.displayModal = !this.displayModal; // Toggle the modal visibility
    }

    protected readonly OperationType = OperationType;
    protected readonly Object = Object;
}
