import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {LenderProvisionService} from "../../../../services/lender-provision.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {LenderProvision} from "../../../../commons/interfaces/lender-provision";
import {Response} from 'src/app/commons/models/response';
import {Observable, share} from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-lender-provision-index',
    templateUrl: './lender-provision-index.component.html',
    styleUrls: ['./lender-provision-index.component.css']
})
export class LenderProvisionIndexComponent implements OnInit, OnChanges {

    @Input()
    codeLender: any
    page$: Observable<Response<PaginatedResource<LenderProvision>>>;
    @Input()
    title: string;
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Amount', 'Status', 'Fees', 'Date creation'];
    exportFileName: string = ""
    Permissions = Permissions


    constructor(private provisionRequestService: LenderProvisionService, private router: Router, public keycloakService: KeycloakService) {
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
            const source = this.provisionRequestService.getAllList(this.codeLender)
            source.subscribe({
                next: response => {
                    const columns = response?.data.map((data: LenderProvision) => [data.amount, data.status, data.fees, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.provisionRequestService.getAll(this.codeLender, page, 5).pipe(share());

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
