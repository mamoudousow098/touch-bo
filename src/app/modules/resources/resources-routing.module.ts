import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LenderIndexComponent} from "./lender/index/lender-index.component";
import {AuthGuard} from "../../guards/auth.guard";
import {LenderShowComponent} from "./lender/show/lender-show.component";
import {AggregatorIndexComponent} from "./aggregator/index/aggregator-index.component";
import {AggregatorShowComponent} from "./aggregator/show/aggregator-show.component";
import {WholesalerIndexComponent} from "./wholesaler/index/wholesaler-index.component";
import {WholesalerShowComponent} from "./wholesaler/show/wholesaler-show.component";
import {AgentIndexComponent} from "./agent/index/agent-index.component";
import {AgentShowComponent} from "./agent/show/agent-show.component";
import { Permissions } from 'src/app/commons/enums/Permissions';
import { CreditRequestShowComponent } from './credit-request/show/credit-request-show/credit-request-show.component';
import {SupplyComponent} from "./supply/supply.component";
import {ShowSuplierComponent} from "./supply/show-suplier/show-suplier.component";
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import {ProductComponent} from "./product/index/product.component";


const routes: Routes = [
    {path: 'lender',
        component: LenderIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_LENDER]}
    },
    {path: 'lender/:codeLender',
        component: LenderShowComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.SHOW_LENDER]}
    },

    {
        path: 'aggregator',
        component: AggregatorIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_AGGREGATOR]}
    },
    {
        path: 'aggregator/:codeAggregator',
        component: AggregatorShowComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.SHOW_AGGREGATOR]}
    },

    {
        path: 'wholesaler',
        component: WholesalerIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_WHOLESALER]}
    },
    {
        path: 'wholesaler/:codeWholesaler',
        component: WholesalerShowComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.SHOW_WHOLESALER]}
    },

    {
        path: 'agent',
        component: AgentIndexComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_AGENT]}
    },
    {
        path: 'supplier',
        component: SupplyComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_AGENT]}
    },
    {
        path: 'supplier/:codeFournisseur',
        component: ShowSuplierComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_AGENT]}
    },
    {
        path: 'product',
        component: ProductComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.INDEX_AGENT]}
    },
    
    {
        path: 'agent/:codeAgent',
        component: AgentShowComponent,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.SHOW_AGENT]}
    },
    {
        path: 'credit_request/:token',
        component: CreditRequestShowComponent
        ,
        canActivate: [AuthGuard],
        data: {roles: [Permissions.SHOW_CREDIT_REQUEST]}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
