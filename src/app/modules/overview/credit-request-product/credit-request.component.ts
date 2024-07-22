import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable, share, Subject} from "rxjs";
import {Response} from "../../../commons/models/response";
import {PaginatedResource} from "../../../commons/interfaces/paginated-resource";
import {CreditRequest} from "../../../commons/interfaces/credit-request";
import {KeycloakService} from "keycloak-angular";
import {ToastrService} from "ngx-toastr";
import {CreditRequestService} from "../../../services/credit-request.service";
import {Router} from "@angular/router";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../commons/errors/forbidden-error";
import Swal from "sweetalert2";
import {exportExcelFile, navigateBack} from "../../../commons/helpers";
import {CreditRequestStatus} from "../../../commons/enums/CreditRequestStatus";
import { Permissions } from 'src/app/commons/enums/Permissions';
import {Aggregator} from "../../../commons/interfaces/aggregator";
import {Breadcrumb} from "../../../commons/interfaces/breadcrumb";
import {AggregatorService} from "../../../services/aggregator.service";
import {BreadcrumbService} from "../../../commons/services/breadcrumb.service";
import * as XLSX from "xlsx";

import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import {OverviewCreditRequestProduct} from "../../../commons/interfaces/overview-credit-request-product";

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit, OnChanges {
    data: OverviewCreditRequestProduct[];
    search = {
        codeAgent: '',
        codeProduct: '',
        codeCategory: '',
        type: '',
        startDate: '',
        endDate: '',
        status: '',
        codeSupplier: ''
    }

    @Input()
    codeSupplier: string
    page$: Observable<Response<PaginatedResource<OverviewCreditRequestProduct>>>;
    aggregators$: Observable<Response<Aggregator[]>>

    codeAgentChanges: Subject<string> = new Subject<string>();
    codeWholeSalerChanges: Subject<string> = new Subject<string>();


    items: Breadcrumb[] = [

        { label:  'Credit requests' },
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    Permissions = Permissions
    protected readonly CreditRequestStatus = CreditRequestStatus;
    protected readonly CreditRequestType = CreditRequestType;


    constructor(private creditService: CreditRequestService,
                public keycloakService: KeycloakService,
                private aggregatorService: AggregatorService,
                private breadcrumbService: BreadcrumbService,
                private toastr: ToastrService,
                private router: Router) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.search.codeSupplier = this.codeSupplier
    }
    getColorClassForStatus(status: string): string {
        switch (status) {
            case 'VALIDATED':
                return 'bg-teal-100 text-teal-600';
            case 'INITIATED': // Add case for 'INITIATED' status
                return 'bg-purple-100 text-purple-600';
            case 'PAID':
                return 'bg-blue-100 text-blue-600';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-600';
            case 'FAILED':
                return 'bg-red-100 text-red-600';
            case 'REJETE':
                return 'bg-orange-100 text-orange-600';
            default:
                return 'bg-gray-100 text-gray-600'; // Default color
        }
    }

    ngOnInit(): void {
        this.goToPage()
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        this.aggregators$ = this.aggregatorService.getAll().pipe(share());

    }
    goToPage(page: number = 0) {
        this.page$ = this.creditService.getCreditRequestsProduct(
            page,
            10,
            this.search.codeAgent,
            this.search.codeProduct,
            this.search.codeCategory,
            this.search.type,
            this.search.status,
            this.search.startDate,
            this.search.endDate,
            this.search.codeSupplier
        ).pipe(share())

        this.page$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])
                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })

    }



    onCodeAgentChange(value: any) {
        this.search.codeAgent =  value.target.value;
        this.goToPage();
    }
    onCodeCategoryChange(value: any) {
        this.search.codeCategory = value.target.value;
        this.goToPage();

    }

    exportExcel() {
        this.creditService.getAllCreditRequestsProducts(this.search.codeAgent,
            this.search.codeCategory,
            this.search.type,
            this.search.status,
            this.search.startDate,
            this.search.endDate)
            .subscribe({
                next: (response) => {
                    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
                        // Show a SweetAlert for no data available
                        Swal.fire({
                            icon: 'info',
                            title: 'No Data Available',
                            text: 'There is no data available for this Credit Request.',
                        });
                        return;
                    } else {
                        const wb: XLSX.WorkBook = XLSX.utils.book_new();
                        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
                        const headerRow = [
                            'Credit Request Token','External reference',
                            'Aggregator Code', 'Aggregator Description',
                            'Wholesaler Code', 'Wholesaler Description',
                            'Customer Code', 'Customer Description',
                            'Amount', 'Fees',
                            'Recovered Amount', 'Outstanding Balance','Credit Request Currency',
                            'Status', 'Type',
                            'Created At'
                        ];
                        XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {origin: -1});
                        const mappedRows = response.data.map((data )=> {
                            return [
                                data.token, data.externalReference,
                                data.agent?.wholesaler?.aggregator?.codeAggregator || '',
                                data.agent?.wholesaler?.aggregator?.description || '',
                                data.agent?.wholesaler?.codeWholesaler || '',
                                data.agent?.wholesaler?.description || '',
                                data.agent?.codeAgent || '',
                                data.agent?.description || '',
                                data.amount || '',
                                data.fees || '',
                                data.recoveredAmount || '',
                                data.outstandingBalance || '',
                                data.currency || '',
                                data.status || '',
                                data.type || '',
                                data.createdAt || '',
                            ];
                        });
                        try {
                            this.toastr.info('File will be exported soon. Check downloads', 'File exportation', {
                                timeOut: 3000,
                            });
                            exportExcelFile(mappedRows, headerRow, 'Credit_Request')

                        } catch (err) {
                            this.toastr.error('Cannot export excel file. Contact your manager for more informations', 'File download error', {
                                timeOut: 3000,
                            });
                        }
                    }
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found']);
                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden']);
                }
            });
    }


}
