import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundError, Observable, of, share } from 'rxjs';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';
import { AppError } from 'src/app/commons/errors/app-error';
import { ForbiddenError } from 'src/app/commons/errors/forbidden-error';
import { handleFormError } from 'src/app/commons/helpers';
import { CreditMetrics } from 'src/app/commons/interfaces/creditMetrics';
import { SystemFlux } from 'src/app/commons/interfaces/system-flux';
import { Response } from 'src/app/commons/models/response';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-metric',
  templateUrl: './system-metric.component.html',
  styleUrls: ['./system-metric.component.css']
})
export class SystemMetricComponent implements OnInit{
  
  systemBalanceMetrics$: Observable<CreditMetrics>;
  overdraftMetrics$: Observable<CreditMetrics>;
  nanoCreditMetrics$: Observable<CreditMetrics>;
  currencyErrorMessage : string;

  systemFlux$: Observable<Response<SystemFlux>>

  dayBefore = 7
  currency= SystemCurrency.xof
  
  constructor(private dashboardService: DashboardService, private router: Router){}
  
  ngOnInit(): void {
    this.getSystemMetrics(this.dayBefore, this.currency)
  }

  private getSystemMetrics(selectedPeriod: number, selectedCurrency: SystemCurrency) {
    this.systemFlux$ = this.dashboardService.getMetricsFlux(selectedPeriod, selectedCurrency).pipe(share())
    this.systemFlux$.subscribe({
        next: (response) =>{
          console.log("here");
          const systemBalance: CreditMetrics = {
            flux: response.data.systemBalance,
            volume: null,
            type: null
          }
          this.systemBalanceMetrics$ = of(systemBalance)
          this.overdraftMetrics$ = of(response.data.overdraft)
          this.nanoCreditMetrics$ = of(response.data.nanoCredit)
          console.log("Overdraft", this.overdraftMetrics$);
          
        },
        error: (err) => {
            if (err instanceof NotFoundError)
                this.router.navigate(['/not-found'])

            if (err instanceof ForbiddenError)
                this.router.navigate(['/forbidden'])
            this.currencyRateAlert(err.errors.message)
            this.currencyErrorMessage = err.errors.message
            
        }
    })
}


currencyRateAlert(err: string) {
  Swal.fire({
      title: 'Alert?',
      text: err,
      icon: 'warning',
      showCancelButton: false,
  })
}
onStatsPeriodChange(period: any) {
  this.dayBefore = period
  console.log(period);
  this.getSystemMetrics(this.dayBefore, this.currency); // Initialize chart with default period
}

}
