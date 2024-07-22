import {Component, Input, SimpleChanges} from '@angular/core';
import {Chart, ChartDataset, registerables} from 'chart.js';
import {Observable, share} from 'rxjs';
import {CreditRequestType} from 'src/app/commons/enums/CreditRequestType';
import {AppError} from 'src/app/commons/errors/app-error';
import {Response} from 'src/app/commons/models/response';
import {DashboardService} from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-credit-wholesaler-flux-chart',
    templateUrl: './credit-wholesaler-flux-chart.component.html',
    styleUrls: ['./credit-wholesaler-flux-chart.component.css']
})
export class CreditWholesalerFluxChartComponent {

    chart: Chart | null = null; // Store the chart instance
    data$: Observable<Response<ChartDataset[]>>
    selectedPeriod: number = 7;
    @Input() wholesalerCode: string;


    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        Chart.register(...registerables);
        this.updateChart(this.selectedPeriod, this.wholesalerCode); // Initialize chart with default period
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateChart(this.selectedPeriod, this.wholesalerCode);
    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event;
        this.updateChart(this.selectedPeriod, this.wholesalerCode); // Update chart when period changes
    }

    private updateChart(selectedPeriod: number, wholesalerCode: string) {
        this.data$ = this.dashboardService.getCreditWholesalerFluxChartData(selectedPeriod, wholesalerCode).pipe(share())
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
        const creditTypes = new Set(data.map((element: any) => element.type))
        console.log(data, creditTypes);
        data.sort((a:any, b:any) =>{
            // Convert the date strings to Date objects
            const dateA = new Date(a.label.split('-').reverse().join('-'));
            const dateB = new Date(b.label.split('-').reverse().join('-'));
        
            //@ts-ignore
            return dateA - dateB;
        });
        creditTypes
        creditTypes.forEach(element => {
            switch (element) {
                case CreditRequestType.Overdraft :
                    datasetsValues.push({
                        label: `Wholesaler Credit Flux last ${this.selectedPeriod} Days.`,
                        data: data.filter((data: any) => data.type == element),
                        fill: true,
                        borderColor: 'rgb(39, 44, 92, 0.7)',
                        backgroundColor: 'rgba(39, 44, 92, 0.3)',
                        tension: 0.5
                    })
                    break;
                case CreditRequestType.NanoCredit :
                    datasetsValues.push({
                        label: `Wholesaler Nano Credit Flux last ${this.selectedPeriod} Days.`,
                        data: data.filter((data: any) => data.type == element),
                        fill: true,
                        borderColor: 'rgba(168, 24, 53, 0.7)',
                        backgroundColor: 'rgba(168, 24, 53, 0.3)',
                        tension: 0.5
                    })
                    break;
                default:
                    break;
            }
        })

        this.chart = new Chart("creditWholesalerFluxChart", {
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
