import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable, share } from 'rxjs';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import { AppError } from 'src/app/commons/errors/app-error';
import { ChartDataset } from 'src/app/commons/interfaces/chart-dataset';
import { CreditAndRefundSummaryStats } from 'src/app/commons/interfaces/credit-refund-summary-stats';
import { Response } from 'src/app/commons/models/response';
import { DashboardService } from 'src/app/services/dashboard.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-credit-refund-summary',
  templateUrl: './credit-refund-summary.component.html',
  styleUrls: ['./credit-refund-summary.component.css']
})
export class CreditRefundSummaryComponent implements OnInit, OnChanges {
  selectedPeriod: number = 7;
  chart: Chart | null = null; // Store the chart instance
  data$: Observable<Response<CreditAndRefundSummaryStats>>
  nanoCreditRefundPart ='0%'
  overdraftRefundPart ='0%'
  nanoCreditRequestPart ='0%'
  overdraftRequestPart ='0%'
  @Input() aggregatorCode: string;

    constructor(private dashboardService: DashboardService, private translateService: TranslateService) {
    }

    translatedLabel:string = '';
    translatedLabelRef:string = '';
    ngOnInit(): void {
      Chart.register(...registerables);
        this.updateTranslatedLabel();
      this.updateChart(this.selectedPeriod, this.aggregatorCode); // Initialize chart with default period
        this.translateService.onLangChange.subscribe(() => {
            this.updateTranslatedLabel();
            this.updateChart(this.selectedPeriod, this.aggregatorCode);
        });
    }
    private updateTranslatedLabel() {
        if (this.translateService.currentLang) {
            this.translatedLabel = this.translateService.instant('CREDIT_REQUEST_FLUX_LABEL', { selectedPeriod: this.selectedPeriod });
            this.translatedLabelRef = this.translateService.instant('REFUND_FLUX_LABEL', { selectedPeriod: this.selectedPeriod });
        }
    }

  ngOnChanges(changes: SimpleChanges): void {
      this.updateChart(this.selectedPeriod, this.aggregatorCode);
  }

  onPeriodChange(event: any) {
      this.selectedPeriod = event
      this.updateChart(this.selectedPeriod, this.aggregatorCode); // Initialize chart with default period
  }

  private updateChart(selectedPeriod: number, aggregatorCode: string) {
    console.log(aggregatorCode);

      if(typeof aggregatorCode === "undefined") {
        this.data$ = this.dashboardService.getCreditAndRefundSummaryStats(selectedPeriod).pipe(share())
      }
      else{
        this.data$ = this.dashboardService.getCreditAndRefundSummaryStatsByAggregator(selectedPeriod, aggregatorCode).pipe(share())
      }
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

  private createChart(data: CreditAndRefundSummaryStats) {
      console.log(data);
      let nanoCreditRequest = data?.creditRequestParts?.find((element: any)=> element.type == CreditRequestType.NanoCredit)?.value || 0;
      let overdraftRequest = data?.creditRequestParts?.find((element: any)=> element.type == CreditRequestType.Overdraft)?.value || 0;
      this.nanoCreditRequestPart = "" + (Math.round(((nanoCreditRequest/(nanoCreditRequest+overdraftRequest)) || 0)*100*100)/100).toFixed(2) +"%"
      this.overdraftRequestPart = "" + (Math.round(((overdraftRequest/(nanoCreditRequest+overdraftRequest))|| 0)*100*100)/100).toFixed(2) +"%"

      let nanoCreditFees = data?.feesParts?.find((element: any)=> element.type == CreditRequestType.NanoCredit)?.value || 0
      let overdraftFees = data?.feesParts?.find((element: any)=> element.type == CreditRequestType.Overdraft)?.value || 0

      let nanoCreditRefund = data?.refundParts?.find((element: any)=> element.type == CreditRequestType.NanoCredit)?.value || 0
      let overdraftRefund = data?.refundParts?.find((element: any)=> element.type == CreditRequestType.Overdraft)?.value || 0
      this.nanoCreditRefundPart = "" + (Math.round(((nanoCreditRefund/(nanoCreditRequest + nanoCreditFees))|| 0)*100*100)/100).toFixed(2) +"%"
      this.overdraftRefundPart = "" + (Math.round(((overdraftRefund/(overdraftRequest+ overdraftFees))|| 0)*100*100)/100).toFixed(2) +"%"

      //this.nanoCreditRequestPart =
      const datasetsValues: any[] =[]
      let xLabel= [... data.creditRequests.map(element=>element.label), ... data.refunds.map(element=>element.label)]

      xLabel = xLabel.sort((a, b) =>{
        // Convert the date strings to Date objects
        const dateA = new Date(a.split('-').reverse().join('-'));
        const dateB = new Date(b.split('-').reverse().join('-'));

        //@ts-ignore
        return dateA - dateB;
    });
      let creditRequests: ChartDataset[] = []
      let refunds: ChartDataset[] = []
      console.log(xLabel);

      xLabel.forEach(element=>{
        if(data.creditRequests.some(creditRequest=>creditRequest.label == element)){
          creditRequests.push(data.creditRequests.find(creditRequest=>creditRequest.label == element))
        }
        else{
          creditRequests.push({
            label: element,
            type: null,
            codeAggregator: null,
            value: 0
          })
        }
        if(data.refunds.some(refund=>refund.label == element)){
          refunds.push(data.refunds.find(refund=>refund.label == element))
        }
        else{
          refunds.push({
            label: element,
            type: null,
            codeAggregator: null,
            value: 0
          })
        }
      })
      console.log(creditRequests, refunds);


      datasetsValues.push({
        label: this.translatedLabel,
        data: creditRequests,
        fill: true,
        borderColor: 'rgb(39, 44, 92, 0.7)',
        backgroundColor: 'rgba(39, 44, 92, 0.3)',
        tension: 0.5
    })
      datasetsValues.push({
        label: this.translatedLabelRef,
        data: refunds,
        fill: true,
        borderColor: 'rgba(168, 24, 53, 0.7)',
        backgroundColor: 'rgba(168, 24, 53, 0.3)',
        tension: 0.5
    })
      this.chart = new Chart("creditRefundSummary", {
          type: 'line',
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
