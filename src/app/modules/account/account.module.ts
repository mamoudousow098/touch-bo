import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {OperationsComponent} from "./operations/operations.component";
import {CommissionPlanIndexComponent} from "./commission-plan/index/commission-plan-index.component";
import {CommissionPlanCreateComponent} from "./commission-plan/create/commission-plan-create.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateComponent } from './commission-plan/update/update.component';
import { CustomPipeModule } from 'src/app/commons/custom-pipe/custom-pipe.module';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        OperationsComponent,
        CommissionPlanIndexComponent,
        CommissionPlanCreateComponent,
        UpdateComponent,
    ],
    exports: [
        OperationsComponent,
        CommissionPlanIndexComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        CustomPipeModule,
        TranslateModule
    ]
})
export class AccountModule {
}
