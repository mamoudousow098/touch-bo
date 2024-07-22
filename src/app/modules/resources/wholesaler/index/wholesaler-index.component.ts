import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import Swal from "sweetalert2";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {data} from "autoprefixer";
import {KeycloakService} from "keycloak-angular";
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-wholesaler-index',
    templateUrl: './wholesaler-index.component.html',
    styleUrls: ['./wholesaler-index.component.css']
})
export class WholesalerIndexComponent implements OnInit {

    wholesalers$: Observable<Response<PaginatedResource<Wholesaler>>>
    aggregators$: Observable<Response<Aggregator[]>>
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Code Wholesaler', 'Description', 'Code Aggregator', 'Commission Account Balance', 'Credit Account Balance', 'Is active', 'Date creation'];
    exportFileName: string = 'Aggregators';

    search = {
        codeWholesaler: '',
        codeAggregator: ''
    }

    items: Breadcrumb[] = [
        {label: "Wholesalers"}
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    protected readonly data = data;
    Permissions = Permissions

    constructor(public keycloakService: KeycloakService,
                private wholesalerService: WholesalerService,
                private router: Router, private breadcrumbService: BreadcrumbService,
                private aggregatorService: AggregatorService) {
    }

    ngOnInit(): void {

        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)

        this.goToPage()
        this.aggregators$ = this.aggregatorService.getAll().pipe(share())
        this.initExportData();
    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.wholesalerService.getAll(this.search.codeWholesaler, this.search.codeAggregator)
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: Wholesaler) => [data.codeWholesaler, data.description, data.aggregator.codeAggregator, data.commissionAccount?.balance, data.creditAccount?.balance, data.active, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.wholesalers$ = this.wholesalerService.getPage(this.search.codeWholesaler, this.search.codeAggregator, page).pipe(share())
    }


    onAggregatorChange(event: any) {
        this.search.codeAggregator = event.target.value;
        this.goToPage()
    }

    onCodeWholesalerChange(value: any) {
        this.search.codeWholesaler = value.target.value;
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
        this.wholesalerService.delete(codeWholesaler).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {
            }
        })
    }
}
