import {Component, OnInit} from '@angular/core';
import {Observable, share} from "rxjs";
import {Response} from "../../../commons/models/response";
import {SimpleWholesaler} from "../../../commons/interfaces/simple-wholesaler";
import {PaginatedResource} from "../../../commons/interfaces/paginated-resource";
import {Agent} from "../../../commons/interfaces/agent";
import {Aggregator} from "../../../commons/interfaces/aggregator";
import {Breadcrumb} from "../../../commons/interfaces/breadcrumb";
import {KeycloakService} from "keycloak-angular";
import {AgentService} from "../../../services/agent.service";
import {AggregatorService} from "../../../services/aggregator.service";
import {WholesalerService} from "../../../services/wholesaler.service";
import {BreadcrumbService} from "../../../commons/services/breadcrumb.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {exportExcelFile, navigateBack} from "../../../commons/helpers";
import * as XLSX from "xlsx";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../commons/errors/forbidden-error";
import {SupplierService} from "../../../services/supplier.service";
import {Fournisseur} from "../../../commons/interfaces/suplier";
import {Permissions} from "../../../commons/enums/Permissions";

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit{

    page$: Observable<Response<PaginatedResource<Fournisseur>>>
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Code Suplier', 'Name', 'Products', 'Date creation'];
    exportFileName: string = 'Suppliers';

    items: Breadcrumb[] = [
        {label: "Suppliers"}]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    Permissions = Permissions

    constructor(private supplierService: SupplierService,
                private router: Router,
                private breadcrumbService: BreadcrumbService,
                public keycloakService: KeycloakService) {
    }

    ngOnInit(): void {
        this.goToPage()
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home);
        this.initExportData();
    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.supplierService.getAll()
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: Aggregator) => [data.codeAggregator, data.description, data.commissionAccount?.balance, data.creditAccount?.balance, data.webhook, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }
    goToPage(page: number = 0) {
        this.page$ = this.supplierService.getPage(page).pipe(share())
        console.log("Supplier here we go")
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

    confirmDelete(codeFournisseur: string) {
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
                this.delete(codeFournisseur);
                
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your item is safe :)', 'error');
            }
        });
    }

    delete(codeFournisseur: string) {
        this.supplierService.delete(codeFournisseur).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                    navigateBack(this.router)
            },
            error: (err) => {
                console.log(err);
                
                Swal.fire('Error!', 'Deletion aborted', 'error');
            }
        })
    }

}
