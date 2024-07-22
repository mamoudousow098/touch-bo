import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {AppError} from "../../../../commons/errors/app-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import {DashboardService} from 'src/app/services/dashboard.service';
import {KeycloakService} from "keycloak-angular";
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-aggregator-show',
    templateUrl: './aggregator-show.component.html',
    styleUrls: ['./aggregator-show.component.css']
})
export class AggregatorShowComponent {
    accountSlug: string | null
    operations: Operation[]
    aggregator$: Observable<Response<Aggregator>>
    generatedCommission$: Observable<Response<any>>
    titleCreditAccount: string;
    titleCommissionAccount: string;
    titleCommissionPlan: string;
    items: Breadcrumb[] = [
        {label: "Aggregators", routerLink: '/aggregator'},
        {label: "Details"}
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    Permissions = Permissions
    protected readonly Commissionable = Commissionable;

    constructor(private router: Router, private route: ActivatedRoute,
                private aggregatorService: AggregatorService,
                public keycloakService: KeycloakService,
                private breadcrumbService: BreadcrumbService,
                private dashboardService: DashboardService) {
        this.accountSlug = null
        this.operations = []
    }


    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        const codeAggregator = this.route.snapshot.paramMap.get('codeAggregator')
        if (codeAggregator != null) {
            this.titleCreditAccount = "Aggregator-" + codeAggregator + "_Credit_Account_operations"
            this.titleCommissionAccount = "Aggregator-" + codeAggregator + "_Commission_Account_operations"
            this.titleCommissionPlan = "Aggregator-" + codeAggregator + "_Commission_Plan"
            this.generatedCommission$ = this.dashboardService.getGeneratedCommissionByAggregator(codeAggregator)
            this.aggregator$ = this.aggregatorService.show(codeAggregator).pipe(share())
            this.aggregator$
                .subscribe({
                    error: (err: AppError) => {
                        if (err instanceof BadRequestError)
                            this.router.navigate(['/not-found'])
                        if (err instanceof ForbiddenError)
                            this.router.navigate(['/forbidden'])
                    }
                })
        }
    }
}
