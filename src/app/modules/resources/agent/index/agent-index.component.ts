import {Component, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {exportExcelFile, navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from 'sweetalert2';
import {KeycloakService} from "keycloak-angular";
import {debounceTime, distinctUntilChanged, Observable, share, Subject, switchMap} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import * as XLSX from "xlsx";
import {ToastrService} from "ngx-toastr";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {SimpleWholesaler} from "../../../../commons/interfaces/simple-wholesaler";
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {Permissions} from 'src/app/commons/enums/Permissions';


@Component({
    selector: 'app-agent-index',
    templateUrl: './agent-index.component.html',
    styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit {
    wholesalers$: Observable<Response<SimpleWholesaler[]>>
    agents$: Observable<Response<PaginatedResource<Agent>>>
    aggregators$: Observable<Response<Aggregator[]>>
    allData$: Observable<any[]>
    exportHeaders: string[] = [
        'Code Customer',
        'Description',
        'Code Wholesaler',
        'Account Balance',
        'Overdraft Billing Occurrence',
        'Overdraft Count Refresh',
        'Overdraft Limit Amount',
        'Overdraft Max Daily Count',
        'Penalty Delay In Days',
        'Is Active',
        'Creation date',
        'Last Refund',
        'Refund is late'
    ];

    exportFileName: string = 'Customers';

    search = {
        codeAgent: '',
        codeWholesaler: '',
        codeAggregator: '',
        refundIsLate: false,

    }


    items: Breadcrumb[] = [
        {label: "Customers"}
    ]

    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    agentsWithLateRefund$: Observable<any>;
    Permissions = Permissions

    constructor(public keycloakService: KeycloakService,
                private agentService: AgentService,
                private aggregatorService: AggregatorService,
                private wholesalerService: WholesalerService,
                private breadcrumbService: BreadcrumbService,
                private toastr: ToastrService,
                private router: Router) {
        this.search.refundIsLate = null
    }

    ngOnInit(): void {
        this.agentsWithLateRefund$ = this.agentService.countOfAgentWithLateRefund().pipe(share());
        this.breadcrumbService.setItems(this.items)
        this.breadcrumbService.setHome(this.home)

        this.aggregators$ = this.aggregatorService.getAll().pipe(share())
        this.wholesalers$ = this.wholesalerService.getAll().pipe(share())
        this.goToPage()
        this.initExportData();
    }
    onCodeAgentChange(value: any) {
        this.search.codeAgent =  value.target.value;
        this.goToPage();
    }
    onCodeWholesalerChange(value: any) {
        this.search.codeWholesaler = value.target.value;
        this.goToPage();

    }
    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            if (this.search.codeAggregator == null) {
                this.search.codeAggregator = ''
            }
            const source = this.agentService.getAllList(this.search.codeAggregator, this.search.codeAgent, this.search.codeWholesaler, this.search.refundIsLate)
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: Agent) => [
                        data.codeAgent,
                        data.description,
                        data.wholesaler.codeWholesaler,
                        data.account.balance,
                        data.overdraftBillingOccurrence,
                        data.overdraftCountRefresh,
                        data.overdraftLimitAmount,
                        data.overdraftMaxDailyCount,
                        data.penaltyDelayInDays,
                        data.active, data.createdAt,
                        data.lastRefundAt,
                        data.refundLate
                    ])
                    subscriber.next(columns)
                }
            })
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

    delete(codeAgent: string) {
        this.agentService.delete(codeAgent).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {
            }
        })
    }

    onAggregatorChange(event: any) {
        this.search.codeAggregator = event.target.value;
        if (this.search.codeAggregator == null) {
            this.search.codeAggregator = ''
        }
        this.goToPage()
    }


    goToPage(page: number = 0) {
        this.agents$ = this.agentService.getAll(this.search.codeAggregator, this.search.codeAgent, this.search.codeWholesaler, this.search.refundIsLate, page);
    }

    exportExcel() {
        const exports$ = this.agentService.getAllList(this.search.codeAggregator, this.search.codeAgent, this.search.codeWholesaler, this.search.refundIsLate).pipe(share());
        exports$.subscribe({
            next: (response) => {
                if (!response.data ||
                    response.data.length === 0
                ) {
                    Swal.fire({
                        icon: 'info',
                        title: 'No Data Available',
                        text: 'There is no corresponding customer.',
                    });
                    return;
                }
                const wb: XLSX.WorkBook = XLSX.utils.book_new();
                const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
                const headerRow = [
                    'Wholesaler Code',
                    'Wholesaler Description',
                    'Customer Code',
                    'Customer Description',
                    'Balance',
                    'Created At',
                ];

                XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {origin: -1});
                const mappedRows = response.data.map((data: {
                    wholesaler: { codeWholesaler: any; description: any; };
                    codeAgent: any;
                    description: any;
                    account: { balance: any; };
                    createdAt: any;
                }) => {
                    return [
                        data.wholesaler?.codeWholesaler || '',
                        data.wholesaler?.description || '',
                        data.codeAgent || '',
                        data.description || '',
                        data.account?.balance || '',
                        data.createdAt || '',
                    ];
                });
                try {
                    this.toastr.info('File will be exported soon. Check downloads', 'File exportation', {
                        timeOut: 3000,
                    });
                    exportExcelFile(mappedRows, headerRow, 'Filtered_customers')

                } catch (err) {
                    this.toastr.error('Cannot export excel file. Contact your manager for more informations', 'File download error', {
                        timeOut: 3000,
                    });
                }
            },
            error: (err: AppError) => {
                if (err instanceof NotFoundError) this.router.navigate(['/not-found']);
                if (err instanceof ForbiddenError) this.router.navigate(['/forbidden']);
            },
        });
    }

    isTwentyFourHoursAgo(date: Date): boolean {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        return date < twentyFourHoursAgo;
    }

    onRefundIsLateChange(event: any) {
        this.search.refundIsLate = event.target.value;
        this.goToPage()
    }


}
