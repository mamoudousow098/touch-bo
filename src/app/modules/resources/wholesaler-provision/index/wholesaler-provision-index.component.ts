import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {WholesalerProvisionService} from "../../../../services/wholesaler-provision.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {WholesalerProvision} from "../../../../commons/interfaces/wholesaler-provision";
import {Observable} from 'rxjs/internal/Observable';
import {Response} from 'src/app/commons/models/response';
import {share} from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-wholesaler-provision-index',
    templateUrl: './wholesaler-provision-index.component.html',
    styleUrls: ['./wholesaler-provision-index.component.css']
})
export class WholesalerProvisionIndexComponent implements OnInit, OnChanges {

    @Input()
    codeWholesaler: any
    page$: Observable<Response<PaginatedResource<WholesalerProvision>>>;
    @Input()
    title: string;
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Amount', 'Fees', 'Status', 'Date creation'];
    exportFileName: string = ""
    Permissions = Permissions


    constructor(private provisionRequestService: WholesalerProvisionService,
                public keycloakService: KeycloakService,
                private router: Router) {
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
            const source = this.provisionRequestService.getAllList(this.codeWholesaler)
            source.subscribe({
                next: response => {
                    const columns = response?.data.map((data: WholesalerProvision) => [data.amount, data.fees, data.status, data.createdAt])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.provisionRequestService.getAll(this.codeWholesaler, page, 5).pipe(share());
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
