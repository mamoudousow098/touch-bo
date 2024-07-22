import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {DashboardGuard} from "./guards/dashboard.guard";

const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard, DashboardGuard]},

    {path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)},

    {path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule)},

    {path: '', loadChildren: () => import('./modules/resources/resources.module').then((m) => m.ResourcesModule)},

    {path: '', loadChildren: () => import('./modules/shared/shared.module').then((m) => m.SharedModule)},

    {path: '', loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule)},

    {path: '', loadChildren: () => import('./modules/overview/overview.module').then((m) => m.OverviewModule)},

    {path: '**', redirectTo: 'not-found'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
