import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Chart, registerables} from 'chart.js';
import {NotFoundError, Observable, share} from 'rxjs';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import {AppError} from 'src/app/commons/errors/app-error';
import {ForbiddenError} from 'src/app/commons/errors/forbidden-error';
import {Aggregator} from 'src/app/commons/interfaces/aggregator';
import {CreditMetrics} from 'src/app/commons/interfaces/creditMetrics';
import {Response} from 'src/app/commons/models/response';
import {DashboardService} from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-stats-by-aggregator',
    templateUrl: './stats-by-aggregator.component.html',
    styleUrls: ['./stats-by-aggregator.component.css']
})
export class StatsByAggregatorComponent implements OnInit {
    creditCountChart: Chart | null = null;
    creditFluxChart: Chart | null = null;
    creditCountByWholesalerChart: Chart | null = null;
    creditFluxByWholesalerChart: Chart | null = null;

    overdraftMetrics$: Observable<Response<CreditMetrics>>;
    nanoCreditMetrics$: Observable<Response<CreditMetrics>>;
    overdraftPeriod: number = 7;
    nanoCreditPeriod: number = 7;
    selectedPeriod: number = 7;

    @Input() aggregator: Aggregator;

    constructor(private dashboardService: DashboardService, private router: Router) {
    }

    ngOnInit(): void {
        Chart.register(...registerables);
        this.getOverDraftMetrics(this.overdraftPeriod);
        this.getNanoCreditMetrics(this.nanoCreditPeriod)
    }

    onOverdraftPeriodChange(period: any) {
        this.overdraftPeriod = period
        console.log(period);
        
        this.getOverDraftMetrics(this.overdraftPeriod); // Initialize chart with default period
    }

    onNanoCreditPeriodChange(period: any) {
        this.nanoCreditPeriod = period
        console.log(period);
        
        this.getNanoCreditMetrics(this.nanoCreditPeriod); // Initialize chart with default period
    }

    private getOverDraftMetrics(selectedPeriod: number) {
        this.overdraftMetrics$ = this.dashboardService.getAggregatorMetricsByType(selectedPeriod, this.aggregator.codeAggregator , CreditRequestType.Overdraft).pipe(share())
        this.overdraftMetrics$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
    }

    private getNanoCreditMetrics(selectedPeriod: number) {
        this.nanoCreditMetrics$ = this.dashboardService.getAggregatorMetricsByType(selectedPeriod, this.aggregator.codeAggregator , CreditRequestType.NanoCredit).pipe(share())
        this.nanoCreditMetrics$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
    }

}
