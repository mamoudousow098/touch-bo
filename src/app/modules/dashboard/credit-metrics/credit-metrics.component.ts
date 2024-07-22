import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartDataset, registerables } from 'chart.js';
import { Observable, share } from 'rxjs';
import { AppError } from 'src/app/commons/errors/app-error';
import { CreditDataset } from 'src/app/commons/interfaces/chart-dataset';
import { Response } from 'src/app/commons/models/response';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-credit-metrics',
  templateUrl: './credit-metrics.component.html',
  styleUrls: ['./credit-metrics.component.css']
})
export class CreditMetricsComponent  implements OnInit, OnChanges {
  selectedPeriod: number = 7;
  data$: Observable<Response<CreditDataset[]>>
  @Input() aggregatorCode: string;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
      Chart.register(...registerables);
      this.getData(this.selectedPeriod, this.aggregatorCode); // Initialize chart with default period
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.getData(this.selectedPeriod, this.aggregatorCode);
  }

  onPeriodChange(event: any) {
      this.selectedPeriod = event.target.value
      this.getData(this.selectedPeriod, this.aggregatorCode); // Initialize chart with default period
  }

  private getData(selectedPeriod: number,aggregatorCode: string) {
    if(typeof aggregatorCode  === "undefined"){
        this.data$ = this.dashboardService.getMetricsByType(selectedPeriod).pipe(share())
    }
    else{
      this.data$ = this.dashboardService.getMetricsByType(selectedPeriod,aggregatorCode).pipe(share())
  }
  }
  
}