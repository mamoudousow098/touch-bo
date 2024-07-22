import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundError, Observable, share } from 'rxjs';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';
import { AppError } from 'src/app/commons/errors/app-error';
import { ForbiddenError } from 'src/app/commons/errors/forbidden-error';
import { DashboardMetrics } from 'src/app/commons/interfaces/dashboard-metrics';
import { CreditMetrics } from 'src/app/commons/interfaces/creditMetrics';
import { SystemMetrics } from 'src/app/commons/interfaces/systemMetrics';
import { Response } from 'src/app/commons/models/response';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-currency-stats',
  templateUrl: './currency-stats.component.html',
  styleUrls: ['./currency-stats.component.css']
})
export class CurrencyStatsComponent implements OnInit, OnChanges {

  @Input() currency: SystemCurrency;
  @Input() label: string;
  @Input() background: string;
  backgroundColor: string;
  
  metrics$: Observable<Response<SystemMetrics>>;
  period: number = 7;

  constructor(private dashboardService: DashboardService, private router: Router) {
  }
    ngOnChanges(changes: SimpleChanges): void {
        this.backgroundColor = "bg-["+this.background+"]"
        console.log(this.backgroundColor);
        
    }

  ngOnInit(): void {
    this.getSystemMetrics(this.period);

}

onPeriodChange(period: any) {

    this.period = period
    console.log(period);
    
    this.getSystemMetrics(this.period);
}


private getSystemMetrics(selectedPeriod: number) {
    this.metrics$ = this.dashboardService.getSystemMetricsByCurrency(selectedPeriod, '', this.currency).pipe(share())
    this.metrics$.subscribe({
        error: (err: AppError) => {
            if (err instanceof NotFoundError)
                this.router.navigate(['/not-found'])

            if (err instanceof ForbiddenError)
                this.router.navigate(['/forbidden'])
        }
    })
}

}
