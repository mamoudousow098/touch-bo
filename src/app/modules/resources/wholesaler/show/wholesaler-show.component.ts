import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-wholesaler-show',
    templateUrl: './wholesaler-show.component.html',
    styleUrls: ['./wholesaler-show.component.css']
})
export class WholesalerShowComponent {
    wholesaler: Wholesaler | null
    accountSlug: string | null
    operations: Operation[]
    wholesaler$: Observable<Response<Wholesaler>>
    aggregators$: Observable<Response<Aggregator[]>>
    items: Breadcrumb[] = [
        {label: "Wholesalers", routerLink: '/wholesaler'},
        {label: "Details"}
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    comPlanTitle: string;
    operationalTitle: string;
    commissionTitle: string;
    creditTitle: string;
    provisionTitle: string;
    loanTitle: string;
    Permissions = Permissions


    protected readonly Commissionable = Commissionable;


    constructor(private router: Router, private route: ActivatedRoute, private wholesalerService: WholesalerService, private breadcrumbService: BreadcrumbService
        , private aggregatorService: AggregatorService,public keycloakService: KeycloakService) {
        this.wholesaler = null
        this.accountSlug = null
        this.operations = []

    }

    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        const codeWholesaler = this.route.snapshot.paramMap.get('codeWholesaler')
        if (codeWholesaler != null) {
            this.comPlanTitle = "Wholesaler-" + codeWholesaler + "_Commission_Plan_Operations"
            this.operationalTitle = "Wholesaler-" + codeWholesaler + "_Operational_account_operations"
            this.commissionTitle = "Wholesaler-" + codeWholesaler + "_Commission_account_operations"
            this.creditTitle = "Wholesaler-" + codeWholesaler + "_Credit_account_operations"
            this.provisionTitle = "Wholesaler-" + codeWholesaler + "_Provision_requests"
            this.loanTitle = "Wholesaler-" + codeWholesaler + "_Loan_requests"

            this.wholesaler$ = this.wholesalerService.show(this.route.snapshot.paramMap.get('codeWholesaler')).pipe(share())
            this.wholesaler$.subscribe({
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])

                }
            })
        }
        this.aggregators$ = this.aggregatorService.getAll().pipe(share())
    }
}
