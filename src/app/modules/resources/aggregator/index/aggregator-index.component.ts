import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from "sweetalert2";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-aggregator-index',
    templateUrl: './aggregator-index.component.html',
    styleUrls: ['./aggregator-index.component.css']
})
export class AggregatorIndexComponent implements OnInit {

    page$: Observable<Response<PaginatedResource<Aggregator>>>
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Code Aggregator', 'Description', 'Commission Account Balance', 'Credit Account Balance', 'Webhook URL', 'Date creation'];
    exportFileName: string = 'Aggregators';

    items: Breadcrumb[] = [
        {label: "Aggregators"}]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    Permissions = Permissions

    constructor(private aggregatorService: AggregatorService, 
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
            const source = this.aggregatorService.getAll()
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: Aggregator) => [data.codeAggregator, data.description, data.commissionAccount?.balance, data.creditAccount?.balance, data.webhook, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.aggregatorService.getPage(page).pipe(share())
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

    delete(codeAggregator: string) {
        this.aggregatorService.delete(codeAggregator).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {
            }
        })
    }
}
