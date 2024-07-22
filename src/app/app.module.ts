import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppErrorHandler} from "./commons/errors/app-error-handler";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./commons/keycloak-init.factory";
import {RouteReuseStrategy} from "@angular/router";
import {CustomRouteReuseStrategy} from "./commons/custom-route-reuse-strategy";
import {NgxDropzoneModule} from "ngx-dropzone";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        KeycloakAngularModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        NgxDropzoneModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })

    ],
    providers: [
        HttpClient,

        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
        {
            provide: RouteReuseStrategy,
            useClass: CustomRouteReuseStrategy
        },
        {provide: ErrorHandler, useClass: AppErrorHandler},

        CurrencyPipe,
        { provide: LOCALE_ID, useValue: 'fr' },


    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        // Register the French locale data
        registerLocaleData(localeFr);
      }
}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
