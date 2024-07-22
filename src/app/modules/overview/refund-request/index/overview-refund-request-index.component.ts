import {Component, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {AppError} from "../../../../commons/errors/app-error";
import {OverviewRefundRequest} from "../../../../commons/interfaces/overview-refund-request";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {RefundRequestStatus} from "../../../../commons/enums/RefundRequestStatus";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {BreadcrumbService} from "../../../../commons/services/breadcrumb.service";
import {exportExcelFile} from 'src/app/commons/helpers';
import {ToastrService} from "ngx-toastr";
import {RefundRequestService} from 'src/app/services/refund-request.service';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';


@Component({
    selector: 'app-overview-refund-request-index-component',
    templateUrl: './overview-refund-request-index.component.html',
    styleUrls: ['./overview-refund-request-index.component.css']
})
export class OverviewRefundRequestIndexComponent implements OnInit {

    search = {
        codeWholesaler: '',
        codeAgent: '',
        status: '',
        startDate: '',
        endDate: ''
    }

    page$: Observable<Response<PaginatedResource<OverviewRefundRequest>>>;

    items: Breadcrumb[] = [
        {label: "Refund requests" },
    ]

    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    Permissions = Permissions

    protected readonly RefundRequestStatus = RefundRequestStatus;

    constructor(private refundService: RefundRequestService,
                private router: Router,
                private breadcrumbService: BreadcrumbService,
                private toastr: ToastrService,
                public keycloakService: KeycloakService
    ) {
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
        this.breadcrumbService.setItems(this.items)
        this.breadcrumbService.setHome(this.home)
    }

    goToPage(page: number = 0) {
        this.page$ = this.refundService.getRefundRequests(
            page,
            10,
            this.search.codeWholesaler,
            this.search.codeAgent,
            this.search.status,
            this.search.startDate,
            this.search.endDate
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

    onCodeWholesalerChange(value: any) {
        this.search.codeWholesaler =  value.target.value;
        this.goToPage();
    }

    exportExcel() {
        this.refundService.getAllRefundRequests(this.search.codeWholesaler, this.search.codeAgent, this.search.status, this.search.startDate, this.search.endDate)
            .subscribe({
                next: (response) => {
                    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
                        // Show a SweetAlert for no data available
                        this.toastr.warning('There is no data available.', 'No Data Available', {
                            timeOut: 3000,
                        });
                        ;
                    } else {
                        const headers = ['Token', 'Amount', 'Status', 'Refund date creation',
                            'Credit request token', 'Credit Request external reference', 'Credit request amount', 'Credit request fees', 'Credit request outstanding balance',
                            'Credit request recovered amount','Refund Currency', 'Credit request status', 'Credit request type', 'Credit request date creation',
                            'Customer code', 'Customer description']
                        const dataset = response.data.map(data => [data.token, data.amount, data.status, data.createdAt,
                            data.creditRequest.token, data.creditRequest.externalReference, data.creditRequest.amount, data.creditRequest.fees,
                            data.creditRequest.outstandingBalance, data.creditRequest.recoveredAmount, data.currency,data.creditRequest.status,
                            data.creditRequest.type, data.creditRequest.createdAt,
                            data.creditRequest.agent.codeAgent, data.creditRequest.agent.description
                        ])
                        try {
                            this.toastr.info('File will be exported soon. Check downloads', 'File exportation', {
                                timeOut: 3000,
                            });
                            exportExcelFile(dataset, headers, 'Refund_Request')

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
