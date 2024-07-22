import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {OverviewCreditRequestIndexComponent} from "./credit-request/index/overview-credit-request-index.component";
import {OverviewRefundRequestIndexComponent} from "./refund-request/index/overview-refund-request-index.component";
import { Permissions } from 'src/app/commons/enums/Permissions';
import { OverviewNanoCreditIndexComponent } from './nano-credit/index/overview-nano-credit-index.component';
import { CreditRequestComponent } from './credit-request-product/credit-request.component';

const routes: Routes = [
    {
        path: 'overview/credit-request',
        component: OverviewCreditRequestIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_CREDIT_REQUEST]}
    },
    {
        path: 'overview/credit-request/product',
        component: CreditRequestComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_CREDIT_REQUEST]}
    },
    {
        path: 'overview/nano-credit',
        component: OverviewNanoCreditIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_VALIDATION_OPERATION]}
    },
    {
        path: 'overview/refund-request',
        component: OverviewRefundRequestIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_REFUND_REQUEST]}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OverviewRoutingModule {
}
