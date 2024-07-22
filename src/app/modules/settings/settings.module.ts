import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SharedModule } from "../shared/shared.module";
import { CurrencyRateComponent } from './currency-rate/currency-rate.component';
import { StoreComponent } from './currency-rate/store/store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './currency-rate/update/update.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        StoreComponent,
        CurrencyRateComponent,
        UpdateComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        DashboardModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
    ]
})
export class SettingsModule { }
