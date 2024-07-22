import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoanRequest} from "../../../../commons/interfaces/loan-request";
import {LoanRequestService} from "../../../../services/loan-request.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Router} from "@angular/router";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-loan-request-index',
    templateUrl: './loan-request-index.component.html',
    styleUrls: ['./loan-request-index.component.css']
})
export class LoanRequestIndexComponent implements OnInit, OnChanges {

    @Input()
    codeWholesaler: any
    page$: Observable<Response<PaginatedResource<LoanRequest>>>;
    @Input()
    title: string;
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Code Lender', 'Lender Description', 'Amount', 'Fees', 'Recovered Amount', 'Outstanding Balance', 'Status', 'Date creation'];
    exportFileName: string = ""
    Permissions = Permissions

    constructor(private loanRequestService: LoanRequestService, private router: Router,
                public keycloakService: KeycloakService) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            this.exportFileName = this.title
            this.initExportData();
        }

    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.loanRequestService.getAllList(this.codeWholesaler)
            source.subscribe({
                next: response => {
                    const columns = response?.data.map((data: LoanRequest) => [data.lender.codeLender, data.lender.description, data.amount, data.fees, data.recoveredAmount, data.outstandingBalance, data.status, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.loanRequestService.getAll(this.codeWholesaler, page).pipe(share())
        this.page$.subscribe({

            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })

    }
}
