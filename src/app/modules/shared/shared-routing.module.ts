import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundComponent} from './not-found/not-found.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {MediaDisplayComponent} from "./media-show/media-display/media-display.component";

const routes: Routes = [
    {path: 'not-found', component: NotFoundComponent, title: 'not-found'},
    {path: 'forbidden', component: ForbiddenComponent, title: 'forbidden'},
    { path: 'media-display/:token', component: MediaDisplayComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {
}
