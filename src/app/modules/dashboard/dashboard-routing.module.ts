import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {DashboardIndexComponent} from "./index/dashboard-index.component";
import {Permissions} from "../../commons/enums/Permissions";

const routes: Routes = [
    {path: 'dashboard', component: DashboardIndexComponent, canActivate: [AuthGuard], data: {roles: [Permissions.SHOW_SYSTEM_STATS]}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
