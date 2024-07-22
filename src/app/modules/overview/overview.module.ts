import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OverviewRoutingModule} from './overview-routing.module';
import {OverviewCreditRequestIndexComponent} from './credit-request/index/overview-credit-request-index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {OverviewRefundRequestIndexComponent} from "./refund-request/index/overview-refund-request-index.component";
import { CustomPipeModule } from 'src/app/commons/custom-pipe/custom-pipe.module';
import {TranslateModule} from "@ngx-translate/core";
import { OverviewNanoCreditIndexComponent } from './nano-credit/index/overview-nano-credit-index.component';
import { CreditRequestComponent } from './credit-request-product/credit-request.component';

@NgModule({
    declarations: [
        OverviewCreditRequestIndexComponent,
        OverviewRefundRequestIndexComponent,
        OverviewNanoCreditIndexComponent,
        CreditRequestComponent
    ],
    imports: [
        CommonModule,
        OverviewRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CustomPipeModule,
        TranslateModule
    ],
    exports: [
        CreditRequestComponent
    ]
})
export class OverviewModule {
}
