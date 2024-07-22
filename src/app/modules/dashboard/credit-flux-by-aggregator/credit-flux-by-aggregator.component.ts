import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable, share } from 'rxjs';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import { AppError } from 'src/app/commons/errors/app-error';
import { ChartDataset } from 'src/app/commons/interfaces/chart-dataset';
import { Response } from 'src/app/commons/models/response';
import { DashboardService } from 'src/app/services/dashboard.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-credit-flux-by-aggregator',
  templateUrl: './credit-flux-by-aggregator.component.html',
  styleUrls: ['./credit-flux-by-aggregator.component.css']
})
export class CreditFluxByAggregatorComponent implements OnInit, OnChanges {
  chart: Chart | null = null; // Store the chart instance
  data$: Observable<Response<ChartDataset[]>>
  selectedPeriod: number = 7;
  translatedLabel:string = '';
  translatedLabelRef:string = '';


  constructor(private dashboardService: DashboardService,private translateService : TranslateService) {
  }
    private updateTranslatedLabel() {
        if (this.translateService.currentLang) {
            this.translatedLabel = this.translateService.instant('OVERDRAFT_FLUX_BY_AGGREGATOR', { selectedPeriod: this.selectedPeriod });
            this.translatedLabelRef = this.translateService.instant('NANO_CREDIT_FLUX_BY_AGGREGATOR', { selectedPeriod: this.selectedPeriod });
        }
    }
  ngOnInit(): void {
      Chart.register(...registerables);
      this.updateChart(this.selectedPeriod); // Initialize chart with default period
      this.updateTranslatedLabel();// Initialize chart with default period
      this.translateService.onLangChange.subscribe(() => {
          this.updateTranslatedLabel();
          this.updateChart(this.selectedPeriod);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateChart(this.selectedPeriod);
  }

  onPeriodChange(event: any) {
      this.selectedPeriod = event;
      this.updateChart(this.selectedPeriod); // Update chart when period changes
  }

  private updateChart(selectedPeriod: number) {
      this.data$ = this.dashboardService.getCreditFluxByAggregatorChartData(selectedPeriod).pipe(share())

      this.data$.subscribe({
          next: (response) => {
              let chartData = response.data;
              //let data = Array.of(chartData.entries)
              // Destroy the previous chart if it exists
              if (this.chart) {
                  this.chart.destroy();
              }

              this.createChart(chartData);
          },
          error: (err: AppError) => {
              // Handle error
          }
      });
  }

  private createChart(data: any) {

      const datasetsValues: any[] = []
      const creditTypes = new Set(data.map((element: any)=>element.type))
      console.log(data, creditTypes);

      creditTypes.forEach(element=>{
          switch (element){
              case CreditRequestType.Overdraft :
                  datasetsValues.push({
                      label: this.translatedLabel,
                      data: data.filter((data: any)=>data.type == element),
                      backgroundColor: 'rgba(39, 44, 92, 0.7)',
                      borderRadius: 20
                  })
                  break;
              case CreditRequestType.NanoCredit :
                  datasetsValues.push({
                      label: this.translatedLabelRef,
                      data: data.filter((data: any)=>data.type == element),
                      backgroundColor: 'rgba(168, 24, 53, 0.7)',
                      borderRadius: 20
                  })
                  break;
              default:
                  break;
          }
      })
      this.chart = new Chart("creditFluxByAggregatorChart", {
          type: 'bar',
          data: {
              datasets: datasetsValues
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              },
              parsing: {
                  xAxisKey: 'label',
                  yAxisKey: 'value'
              }
          }
      });
  }

}
