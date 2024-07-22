import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { CurrencyRateComponent } from './currency-rate/currency-rate.component';

const routes: Routes = [
  {path: 'currency/rate',
    component: CurrencyRateComponent,
    canActivate: [AuthGuard],
    data: {roles: [Permissions.INDEX_CURRENCY_RATE]}
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
