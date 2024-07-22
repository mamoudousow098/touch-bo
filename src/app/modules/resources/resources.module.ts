import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LenderCreateComponent} from './lender/create/lender-create.component';
import {LenderIndexComponent} from './lender/index/lender-index.component';
import {LenderShowComponent} from './lender/show/lender-show.component';
import {LenderUpdateComponent} from "./lender/update/lender-update.component";
import {AggregatorIndexComponent} from "./aggregator/index/aggregator-index.component";
import {AggregatorCreateComponent} from "./aggregator/create/aggregator-create.component";
import {AggregatorShowComponent} from "./aggregator/show/aggregator-show.component";
import {AggregatorUpdateComponent} from "./aggregator/update/aggregator-update.component";
import {WholesalerIndexComponent} from './wholesaler/index/wholesaler-index.component';
import {WholesalerCreateComponent} from './wholesaler/create/wholesaler-create.component';
import {AgentIndexComponent} from './agent/index/agent-index.component';
import {AgentCreateComponent} from './agent/create/agent-create.component';
import {LoanRequestIndexComponent} from './loan-request/index/loan-request-index.component';
import {LoanRequestValidationComponent} from './loan-request/validation/loan-request-validation.component';
import {AgentShowComponent} from "./agent/show/agent-show.component";
import {AgentUpdateComponent} from "./agent/update/agent-update.component";
import {WholesalerShowComponent} from "./wholesaler/show/wholesaler-show.component";
import {LoanRequestCreateComponent} from './loan-request/create/loan-request-create.component';
import {CreditRequestIndexComponent} from "./credit-request/index/credit-request-index.component";
import {LenderProvisionIndexComponent} from './lender-provision/index/lender-provision-index.component';
import {LenderProvisionCreateComponent} from './lender-provision/create/lender-provision-create.component';
import {LenderProvisionValidationComponent} from './lender-provision/validation/lender-provision-validation.component';
import {WholesalerUpdateComponent} from "./wholesaler/update/wholesaler-update.component";

import {ResourcesRoutingModule} from './resources-routing.module';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountModule} from "../account/account.module";
import {NgxDropzoneModule} from "ngx-dropzone";
import {WholesalerProvisionIndexComponent} from "./wholesaler-provision/index/wholesaler-provision-index.component";
import {WholesalerProvisionCreateComponent} from "./wholesaler-provision/create/wholesaler-provision-create.component";
import {
    WholesalerProvisionValidationComponent
} from "./wholesaler-provision/validation/wholesaler-provision-validation.component";
import {ActiveBadgeComponent} from '../shared/active-badge/active-badge.component';
import {ImportExcelComponent} from './agent/import-excel/import-excel.component';
import {AgentsBulkSettingsComponent} from './wholesaler/agents-bulk-settings/agents-bulk-settings.component';
import {LoanRequestRepayComponent} from './loan-request/repay/loan-request-repay.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import {CreditRequestCreateComponent} from './credit-request/create/credit-request-create.component';
import {CreditRequestValidationComponent} from './credit-request/validation/credit-request-validation.component';
import { CustomCurrencyFrPipePipe } from 'src/app/commons/custom-pipe/currencyPipe/custom-currency-fr-pipe.pipe';
import { CustomPipeModule } from 'src/app/commons/custom-pipe/custom-pipe.module';
import {TranslateModule} from "@ngx-translate/core";
import { CreditRequestShowComponent } from './credit-request/show/credit-request-show/credit-request-show.component';
import { ValidationStageIndexComponent } from './validation-stage/validation-stage-index/validation-stage-index.component';
import { ValidationStageCreateComponent } from './validation-stage/validation-stage-create/validation-stage-create.component';
import { ValidationStageUpdateComponent } from './validation-stage/validation-stage-update/validation-stage-update.component';
import { RefundRequestIndexComponent } from './refund-request/index/refund-request-index/refund-request-index.component';
import { RefundRequestUpdateComponent } from './refund-request/update/refund-request-update/refund-request-update.component';
import { RefundRequestCreateComponent } from './refund-request/create/refund-request-create/refund-request-create.component';
import { SupplyComponent } from './supply/supply.component';
import { ProductComponent } from './product/index/product.component';
import { CreateSuplierComponent } from './supply/create-suplier/create-suplier.component';
import { ShowSuplierComponent } from './supply/show-suplier/show-suplier.component';
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { BulkProductsComponent } from './product/bulk-products/bulk-products.component';
import { BulkProductsWithExcelComponent } from './product/bulk-products-with-excel/bulk-products-with-excel.component';
import { UpdateSupplierComponent} from './supply/update/update.component';
import {UpdateProductComponent} from "./product/update/update.component";


import { ActivateComponent } from './wholesaler/dma/activate/activate.component';
import { RefundComponent } from './wholesaler/dma/refund/refund.component';
import {UpdateCategoryComponent} from "./category/update/update.component";
import { ProductRequestIndexComponent } from './produuct-request/index/product-request-index/product-request-index.component';



@NgModule({
    declarations: [
        LenderCreateComponent,
        LenderIndexComponent,
        LenderShowComponent,
        LenderUpdateComponent,
        AggregatorIndexComponent,
        AggregatorCreateComponent,
        AggregatorShowComponent,
        AggregatorUpdateComponent,
        WholesalerIndexComponent,
        WholesalerCreateComponent,
        AgentIndexComponent,
        AgentCreateComponent,
        LoanRequestIndexComponent,
        LoanRequestValidationComponent,
        AgentShowComponent,
        AgentUpdateComponent,
        WholesalerShowComponent,
        LoanRequestCreateComponent,
        CreditRequestIndexComponent,
        CreditRequestCreateComponent,
        LenderProvisionIndexComponent,
        LenderProvisionCreateComponent,
        LenderProvisionValidationComponent,
        WholesalerProvisionIndexComponent,
        WholesalerProvisionCreateComponent,
        WholesalerProvisionValidationComponent,
        CreditRequestValidationComponent,
        WholesalerUpdateComponent,
        ActiveBadgeComponent,
        AgentsBulkSettingsComponent,
        LoanRequestRepayComponent,
        ImportExcelComponent,
        CreditRequestShowComponent,
        ValidationStageIndexComponent,
        ValidationStageCreateComponent,
        ValidationStageUpdateComponent,
        RefundRequestIndexComponent,
        RefundRequestCreateComponent,
        RefundRequestUpdateComponent,
        SupplyComponent,
        ProductComponent,
        SupplyComponent,
        CreateSuplierComponent,
        ShowSuplierComponent,
        CategoryIndexComponent,
        CategoryCreateComponent,
        CreateProductComponent,
        BulkProductsComponent,
        BulkProductsWithExcelComponent,
        UpdateSupplierComponent,
        UpdateProductComponent,
        UpdateCategoryComponent,
        ActivateComponent,
        RefundComponent,
        ProductRequestIndexComponent,


    ],
    imports: [
        CommonModule,
        SharedModule,
        ResourcesRoutingModule,
        ReactiveFormsModule,
        AccountModule,
        NgxDropzoneModule,
        FormsModule,
        DashboardModule,
        CustomPipeModule,
        TranslateModule
        ],

})
export class ResourcesModule {
}
