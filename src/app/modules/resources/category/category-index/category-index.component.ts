import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable, share} from "rxjs";
import {Response} from "../../../../commons/models/response";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {Router} from "@angular/router";
import {BreadcrumbService} from "../../../../commons/services/breadcrumb.service";
import {KeycloakService} from "keycloak-angular";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from "sweetalert2";
import {navigateBack} from "../../../../commons/helpers";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../commons/interfaces/category";
import {Fournisseur} from "../../../../commons/interfaces/suplier";
import {SupplierService} from "../../../../services/supplier.service";
import {Permissions} from 'src/app/commons/enums/Permissions';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements  OnInit,OnChanges{

    page$: Observable<Response<PaginatedResource<Category>>>
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Code Category', 'Name', 'Products', 'Date creation'];
    exportFileName: string = 'Suppliers';

    
    Permissions = Permissions
    @Input()
    codeFournisseur:string
    suppliers$: Observable<Response<Fournisseur>>

    constructor(private categoryService: CategoryService,
                private router: Router,
                private supplierService: SupplierService,
                public keycloakService: KeycloakService) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.goToPage()
        this.suppliers$ = this.supplierService.show(this.codeFournisseur).pipe(share())
       
        this.initExportData();
    }

    ngOnInit(): void {
        this.goToPage()
        this.suppliers$ = this.supplierService.show(this.codeFournisseur).pipe(share())
        
        this.initExportData();

    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.categoryService.getAll()
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: Category) => [data.codeCategory, data.name, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }
    goToPage(page: number = 0) {
        console.log("Code fournisseur: "+this.codeFournisseur);
        
        this.page$ = this.categoryService.getPage(page,10,this.codeFournisseur).pipe(share())
        console.log("Category here we go")
        console.log(this.page$)
        this.page$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
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

    delete(codeFournisseur: string) {
        this.categoryService.delete(codeFournisseur).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {
            }
        })
    }

}
