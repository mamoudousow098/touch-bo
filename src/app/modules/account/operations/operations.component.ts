import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Operation} from "../../../commons/interfaces/operation";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {OperationService} from "../../../services/operation.service";
import {PaginatedResource} from "../../../commons/interfaces/paginated-resource";
import {Router} from "@angular/router";
import {ForbiddenError} from "../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-account-operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit, OnChanges {
    @Input()
    accountSlug: any
    @Input()
    title: string

    page: PaginatedResource<Operation>;
    page$: Observable<Response<PaginatedResource<Operation>>>;
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Type', 'Amount', 'Balance before', 'Balance after', 'Operation Currency', 'Date creation'];
    exportFileName: string;
    Permissions = Permissions


    constructor(private router: Router, private operationService: OperationService, public keycloakService: KeycloakService) {
        this.accountSlug = ''
        this.title = ''
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);

        this.exportFileName = this.title;
        this.initExportData();
    }

    ngOnInit(): void {
        this.goToPage()
    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.operationService.getAccountOperationsList(this.accountSlug)
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: Operation) => [data.type, data.amount, data.balanceBefore, data.balanceAfter, data.operationCurrency, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.operationService.getAccountOperations(this.accountSlug, page).pipe(share());

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
