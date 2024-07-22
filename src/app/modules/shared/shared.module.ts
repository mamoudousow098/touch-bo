import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatedResourceComponent} from './paginated-resource/paginated-resource.component';
import {ModalComponent} from './modal/modal.component';
import {WarningComponent} from './warning/warning.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";

import {SharedRoutingModule} from './shared-routing.module';
import {SidebarComponent} from "./layouts/partials/sidebar/sidebar.component";
import {NavbarComponent} from "./layouts/partials/navbar/navbar.component";
import {MainComponent} from "./layouts/main/main.component";
import {TabContainerComponent} from './tabs/container/tab-container.component';
import {TabItemComponent} from './tabs/item/tab-item.component';
import {DetailCardsComponent} from './detail-cards/detail-cards.component';
import {TableLoaderComponent} from './table-loader/table-loader.component';
import {ChartLoaderComponent} from './chart-loader/chart-loader.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb/breadcrumb.component';
import {ActionsDropdownComponent} from "./actions-dropdown/actions-dropdown.component";
import { InfoComponent } from './info/info.component';
import { ErrorComponent } from './error/error.component';
import { MediaDownloadComponent } from './media-show/media-download.component';
import { ExportTableComponent } from './export-table/export-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeriodSelectDialogComponent } from './period-select-dialog/period-select-dialog.component';
import { CurrencyDropdownComponent } from './currency-dropdown/currency-dropdown.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import {TranslateModule} from "@ngx-translate/core";
import { MediaDisplayComponent } from './media-show/media-display/media-display.component';


@NgModule({
    declarations: [
        ModalComponent,
        NotFoundComponent,
        WarningComponent,
        PaginatedResourceComponent,
        ForbiddenComponent,
        SidebarComponent,
        NavbarComponent,
        MainComponent,
        TabContainerComponent,
        TabItemComponent,
        DetailCardsComponent,
        TableLoaderComponent,
        ChartLoaderComponent,
        BreadcrumbComponent,
        ActionsDropdownComponent,
        InfoComponent,
        ErrorComponent,
        MediaDownloadComponent,
        ExportTableComponent,
        PeriodSelectDialogComponent,
        CurrencyDropdownComponent,
        AutoCompleteComponent,
        MediaDisplayComponent
        ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedRoutingModule,
        TranslateModule
    ],
    exports: [
        ModalComponent,
        NotFoundComponent,
        WarningComponent,
        PaginatedResourceComponent,
        ForbiddenComponent,
        MainComponent,
        TabContainerComponent,
        TabItemComponent,
        DetailCardsComponent,
        TableLoaderComponent,
        ChartLoaderComponent,
        ActionsDropdownComponent,
        InfoComponent,
        ErrorComponent,
        MediaDownloadComponent,
        ExportTableComponent,
        PeriodSelectDialogComponent,
        CurrencyDropdownComponent,
        AutoCompleteComponent,
        MediaDisplayComponent
    ],
})
export class SharedModule {
}
