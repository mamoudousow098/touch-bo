import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {DashboardService} from "../../../services/dashboard.service";
import {AppError} from "../../../commons/errors/app-error";
import {ChartDataset} from "../../../commons/interfaces/chart-dataset";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {CreditRequestType} from 'src/app/commons/enums/CreditRequestType';

@Component({
    selector: 'app-credit-count-by-agent-chart',
    templateUrl: './credit-count-by-agent-chart.component.html',
    styleUrls: ['./credit-count-by-agent-chart.component.css']
})
export class CreditCountByAgentChartComponent implements OnInit, OnChanges {
    chart: Chart | null = null;
    data$: Observable<Response<ChartDataset[]>>;
    selectedPeriod: number = 7;
    @Input() wholesalerCode: string;


    constructor(private dashboardService: DashboardService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateChart(this.selectedPeriod, this.wholesalerCode);
    }

    ngOnInit(): void {
        Chart.register(...registerables);
        this.updateChart(this.selectedPeriod, this.wholesalerCode); // Initialize chart with default period
    }

    addElement(): any {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id", "creditCountByAgentChart");
        const containerDiv = document.getElementById("creditCountByAgentChartContainer")
        containerDiv.appendChild(canvas);
    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event;
        this.updateChart(this.selectedPeriod, this.wholesalerCode); // Update chart when period changes
    }

    private updateChart(selectedPeriod: number, wholesalerCode: string) {

        this.data$ = this.dashboardService.getCreditCountByAgentChartData(selectedPeriod, wholesalerCode).pipe(share())
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
        const creditTypes = new Set(data.map((element: any) => element.type))
        console.log(data, creditTypes);

        creditTypes.forEach(element => {
            switch (element) {
                case CreditRequestType.Overdraft :
                    datasetsValues.push({
                        label: `Wholesaler Credit Count by Customer in last ${this.selectedPeriod} Days.`,
                        data: data.filter((data: any) => data.type == element),
                        backgroundColor: 'rgba(39, 44, 92, 0.7)',
                        borderRadius: 20
                    })
                    break;
                case CreditRequestType.NanoCredit :
                    datasetsValues.push({
                        label: `Wholesaler Nano Credit Count by Customer in last ${this.selectedPeriod} Days.`,
                        data: data.filter((data: any) => data.type == element),
                        backgroundColor: 'rgba(168, 24, 53, 0.7)',
                        borderRadius: 20
                    })
                    break;
                default:
                    break;
            }
        })
        this.chart = new Chart("creditCountByAgentChart", {
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
