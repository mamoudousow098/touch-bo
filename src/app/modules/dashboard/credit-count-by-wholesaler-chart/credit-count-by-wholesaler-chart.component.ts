import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {Observable, share} from 'rxjs';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import {AppError} from 'src/app/commons/errors/app-error';
import {ChartDataset} from 'src/app/commons/interfaces/chart-dataset';
import {Response} from 'src/app/commons/models/response';
import {DashboardService} from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-credit-count-by-wholesaler-chart',
    templateUrl: './credit-count-by-wholesaler-chart.component.html',
    styleUrls: ['./credit-count-by-wholesaler-chart.component.css']
})
export class CreditCountByWholesalerChartComponent implements OnInit, OnChanges {
    chart: Chart | null = null;
    data$: Observable<Response<ChartDataset[]>>
    selectedPeriod: number = 7;
    @Input() aggregatorCode: string;


    constructor(private dashboardService: DashboardService) {
    }


    ngOnInit(): void {
        Chart.register(...registerables);
        this.updateChart(this.selectedPeriod, this.aggregatorCode);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateChart(this.selectedPeriod, this.aggregatorCode);
    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event
        this.updateChart(this.selectedPeriod, this.aggregatorCode); // Update chart when period changes
    }

    private updateChart(selectedPeriod: number, aggregatorCode: string) {
        if (typeof aggregatorCode === "undefined") {
            this.data$ = this.dashboardService.getCreditCountByWholesalerChartData(selectedPeriod).pipe(share())
        } else {
            this.data$ = this.dashboardService.getCreditCountByWholesalerChartData(selectedPeriod, aggregatorCode).pipe(share())
        }
        this.data$.subscribe({
            next: (response) => {
                let chartData = response.data;

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

    private createChart(data: ChartDataset[]) {

        const datasetsValues: any[] = []
        const creditTypes = new Set(data.map(element=>element.type))
        console.log(data, creditTypes);
        
        creditTypes.forEach(element=>{
            switch (element){
                case CreditRequestType.Overdraft :
                    datasetsValues.push({
                        label: `Overdraft Count by Wholesaler in last ${this.selectedPeriod} Days.`,
                        data: data.filter(data=>data.type == element),
                        backgroundColor: 'rgba(39, 44, 92, 0.7)',
                        borderRadius: 20
                    })
                    break;
                case CreditRequestType.NanoCredit :
                    datasetsValues.push({
                        label: `Nano Credit Count by Wholesaler in last ${this.selectedPeriod} Days.`,
                        data: data.filter(data=>data.type == element),
                        backgroundColor: 'rgba(168, 24, 53, 0.7)',
                        borderRadius: 20
                    })
                    break;
                default:
                    break;
            }
        })
        this.chart = new Chart("creditCountByWholesalerChart", {
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
