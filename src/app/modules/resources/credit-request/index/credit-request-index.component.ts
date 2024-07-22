import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Router} from "@angular/router";
import {CreditRequest} from "../../../../commons/interfaces/credit-request";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {CreditRequestService} from 'src/app/services/credit-request.service';
import {CreditRequestStatus} from "../../../../commons/enums/CreditRequestStatus";
import {navigateBack} from "../../../../commons/helpers";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";
import {KeycloakService} from "keycloak-angular";
import { Permissions } from 'src/app/commons/enums/Permissions';


@Component({
    selector: 'app-credit-request-index',
    templateUrl: './credit-request-index.component.html',
    styleUrls: ['./credit-request-index.component.css']
})
export class CreditRequestIndexComponent implements OnInit, OnChanges {

    @Input()
    codeAgent: any
    @Input()
    title: string;
    page$: Observable<Response<PaginatedResource<CreditRequest>>>;
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Type', 'Amount', 'Status', 'Outstanding Balance', 'Recovered amount', 'Fees', 'Date creation'];
    exportFileName: string = ""
    Permissions = Permissions
    search = {
        startDate: '',
        endDate: '',
        status: ''
    }
    protected readonly CreditRequestStatus = CreditRequestStatus;

    constructor(public keycloakService: KeycloakService,
                private toastr: ToastrService,
                private creditRequestService: CreditRequestService, private router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            this.exportFileName = this.title
            this.initExportData();
        }

    }

    ngOnInit(): void {
        this.goToPage()
    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.creditRequestService.getAllCreditRequests(
                this.codeAgent,
                undefined,
                undefined,
                this.search.status,
                this.search.startDate,
                this.search.endDate)
            source.subscribe({
                next: response => {
                    const columns = response?.data.map((data: CreditRequest) => [data.type, data.amount, data.status, data.outstandingBalance, data.recoveredAmount, data.fees, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.creditRequestService.getCreditRequests(
            page, 
            5, 
            this.codeAgent,            
            undefined,
            undefined,
            this.search.status,
            this.search.startDate,
            this.search.endDate).pipe(share());

        this.page$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })

    }

    public cancel(token: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to cancel this overdraft.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.creditRequestService.cancel(token).subscribe({
                    next: (response) => {
                        if (response.statusCode == 200) {
                            this.toastr.success('Credit canceled successfully', 'Success');
                            navigateBack(this.router)
                        } else {
                            this.toastr.error(response.message, 'Error');
                        }
                    },
                    error: (err: AppError) => {
                        this.toastr.error(err.originalError.message(), 'Error');
                    }
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancellation abort', 'The credit cancellation has been abort:)', 'error');
            }
        });
    }

}
