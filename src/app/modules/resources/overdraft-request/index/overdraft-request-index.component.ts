import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Router} from "@angular/router";
import {CreditRequest} from "../../../../commons/interfaces/credit-request";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {OverdraftService} from "../../../../services/overdraft.service";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-overdraft-request-index',
    templateUrl: './overdraft-request-index.component.html',
    styleUrls: ['./overdraft-request-index.component.css']
})
export class OverdraftRequestIndexComponent implements  OnInit, OnChanges{

    @Input()
    codeAgent: any
    @Input()
    title: string;
    page$: Observable<Response<PaginatedResource<CreditRequest>>>;
    allData$: Observable<any[]>
    exportHeaders : string[]= ['Type','Amount', 'Status', 'Outstanding Balance', 'Recovered amount', 'Fees','Date creation'];
    exportFileName: string = ""
    Permissions = Permissions

    constructor(private overdraftService: OverdraftService, private router: Router, public keycloakService: KeycloakService) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes){
            this.exportFileName = this.title
            this.initExportData();
        }

    }

    ngOnInit(): void {
        this.goToPage()
    }

    initExportData(){
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.overdraftService.getAllList(this.codeAgent)
            source.subscribe({
            next : response=>{
                const columns = response?.data.map((data: CreditRequest) => [data.type, data.amount, data.status, data.outstandingBalance, data.recoveredAmount, data.fees,data.createdAt])                
                subscriber.next(columns)
            }
          })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.overdraftService.getAll(this.codeAgent, page, 5).pipe(share());

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
