import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardIndexComponent} from './index/dashboard-index.component';
import {SharedModule} from "../shared/shared.module";
import {CreditCountChartComponent} from './credit-count-chart/credit-count-chart.component';
import {CreditFluxChartComponent} from "./credit-flux-chart/credit-flux-chart.component";
import {FormsModule} from "@angular/forms";
import {CreditCountByAgentChartComponent} from "./credit-count-by-agent-chart/credit-count-by-agent-chart.component";
import {CreditFluxByAgentChartComponent} from "./credit-flux-by-agent-chart/credit-flux-by-agent-chart.component";
import {
    CreditCountByWholesalerChartComponent
} from './credit-count-by-wholesaler-chart/credit-count-by-wholesaler-chart.component';
import {
    CreditFluxByWholesalerChartComponent
} from './credit-flux-by-wholesaler-chart/credit-flux-by-wholesaler-chart.component';
import {StatsByAggregatorComponent} from './stats-by-aggregator/stats-by-aggregator.component';
import {
    CreditWholesalerCountChartComponent
} from './credit-wholesaler-count-chart/credit-wholesaler-count-chart.component';
import {
    CreditWholesalerFluxChartComponent
} from './credit-wholesaler-flux-chart/credit-wholesaler-flux-chart.component';
import { CreditRefundSummaryComponent } from './credit-refund-summary/credit-refund-summary.component';
import { CurrencyStatsComponent } from './currency-stats/currency-stats.component';
import { SystemMetricComponent } from './system-metric/system-metric.component';
import { MetricCardComponent } from './metric-card/metric-card.component';
import { CreditFluxByAggregatorComponent } from './credit-flux-by-aggregator/credit-flux-by-aggregator.component';
import { CreditCountByAggregatorComponent } from './credit-count-by-aggregator/credit-count-by-aggregator.component';
import { CustomCurrencyFrPipePipe } from 'src/app/commons/custom-pipe/currencyPipe/custom-currency-fr-pipe.pipe';
import { CustomPipeModule } from 'src/app/commons/custom-pipe/custom-pipe.module';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({

    declarations: [
        DashboardIndexComponent,
        CreditCountChartComponent,
        CreditCountByAgentChartComponent,
        CreditFluxChartComponent,
        CreditFluxByAgentChartComponent,
        CreditCountByWholesalerChartComponent,
        CreditFluxByWholesalerChartComponent,
        StatsByAggregatorComponent,
        CreditWholesalerCountChartComponent,
        CreditWholesalerFluxChartComponent,
        CreditRefundSummaryComponent,
        CurrencyStatsComponent,
        SystemMetricComponent,
        MetricCardComponent,
        CreditFluxByAggregatorComponent,
        CreditCountByAggregatorComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule,
        FormsModule,
        CustomPipeModule,
        TranslateModule
    ],
    exports: [
        StatsByAggregatorComponent,
        CreditCountByAgentChartComponent,
        CreditFluxByAgentChartComponent,
        CreditWholesalerCountChartComponent,
        CreditWholesalerFluxChartComponent,
        CurrencyStatsComponent,
        CreditFluxByAggregatorComponent,
        CreditCountByAggregatorComponent
    ]
})
export class DashboardModule {
}
