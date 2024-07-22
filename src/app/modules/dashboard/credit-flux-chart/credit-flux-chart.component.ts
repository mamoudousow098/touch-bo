import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {DashboardService} from "../../../services/dashboard.service";
import {AppError} from "../../../commons/errors/app-error";
import {ChartDataset} from "../../../commons/interfaces/chart-dataset";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import { Aggregator } from 'src/app/commons/interfaces/aggregator';
import { CreditRequestType } from 'src/app/commons/enums/CreditRequestType';
import {TranslateService} from "@ngx-translate/core";
import { mergeGraphs } from 'src/app/commons/helpers';

@Component({
    selector: 'app-credit-flux-chart',
    templateUrl: './credit-flux-chart.component.html',
    styleUrls: ['./credit-flux-chart.component.css']
})
export class CreditFluxChartComponent implements OnInit, OnChanges {
    selectedPeriod: number = 7;
    chart: Chart | null = null; // Store the chart instance
    data$: Observable<Response<ChartDataset[]>>
    @Input() aggregatorCode: string;
    translatedLabel:string = '';
    translatedLabelRef:string = '';

    constructor(private dashboardService: DashboardService,private translateService: TranslateService) {
    }

    ngOnInit(): void {
        Chart.register(...registerables);
        this.updateChart(this.selectedPeriod, this.aggregatorCode); // Initialize chart with default period
        this.updateTranslatedLabel();// Initialize chart with default period
        this.translateService.onLangChange.subscribe(() => {
            this.updateTranslatedLabel();
            this.updateChart(this.selectedPeriod, this.aggregatorCode);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateChart(this.selectedPeriod, this.aggregatorCode);
    }
    private updateTranslatedLabel() {
        if (this.translateService.currentLang) {
            this.translatedLabel = this.translateService.instant('OVERDRAFT_FLUX_IN_LAST', { selectedPeriod: this.selectedPeriod });
            this.translatedLabelRef = this.translateService.instant('NANO_CREDIT_FLUX_IN_LAST', { selectedPeriod: this.selectedPeriod });
        }
    }
    onPeriodChange(event: any) {
        this.selectedPeriod = event
        this.updateChart(this.selectedPeriod, this.aggregatorCode); // Initialize chart with default period
    }

    private updateChart(selectedPeriod: number, aggregatorCode: string) {
        if (typeof aggregatorCode === "undefined") {
            this.data$ = this.dashboardService.getCreditFluxChartData(selectedPeriod).pipe(share())
        } else {
            this.data$ = this.dashboardService.getCreditFluxChartDataByAggregator(selectedPeriod, aggregatorCode).pipe(share())
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

    private createChart(data: ChartDataset[]) {
        const datasetsValues: any[] = []
        const creditTypes = new Set(data.map(element=>element.type))
        console.log(data, creditTypes);
        data.sort((a, b) =>{
            // Convert the date strings to Date objects
            const dateA = new Date(a.label.split('-').reverse().join('-'));
            const dateB = new Date(b.label.split('-').reverse().join('-'));

            //@ts-ignore
            return dateA - dateB;
        });
        let overdraft: ChartDataset[]
        let nanoCredit: ChartDataset[]

        creditTypes.forEach(element=>{
            switch (element){
                case CreditRequestType.Overdraft :
                    overdraft = data.filter(data=>data.type == element)
                    // datasetsValues.push({
                    //     label: this.translatedLabel,
                    //     data: data.filter(data=>data.type == element),
                    //     tension: 0.5,
                    //     borderColor: 'rgb(39, 44, 92, 0.7)',
                    // })
                    break;
                case CreditRequestType.NanoCredit :
                    nanoCredit = data.filter(data=>data.type == element)
                    // datasetsValues.push({
                    //     label: this.translatedLabelNan,
                    //     data: data.filter(data=>data.type == element),
                    //     tension: 0.5,
                    //     borderColor: 'rgba(168, 24, 53, 0.7)',
                    // })
                    break;
                default:
                    break;
            }
        })
        const datasets:any[] = mergeGraphs(overdraft, nanoCredit)

        datasetsValues.push({
            label: this.translatedLabel,
            data: datasets[0],
            backgroundColor: 'rgba(39, 44, 92, 0.7)',
            borderRadius: 20
        })

        datasetsValues.push({
            label: this.translatedLabelRef,
            data: datasets[1],
            backgroundColor: 'rgba(168, 24, 53, 0.7)',
            borderRadius: 20
        })

        this.chart = new Chart("creditFluxChart", {
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
