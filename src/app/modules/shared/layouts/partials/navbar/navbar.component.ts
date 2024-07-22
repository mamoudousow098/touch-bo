import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
    profileDropdown: boolean;
    @Output() openSidebar = new EventEmitter();

    username: string | undefined;
    lang ='';

    ngOnInit() {
        this.lang = localStorage.getItem('lang' || 'en')
    }

    constructor(private keycloakService: KeycloakService, private router: Router,
                private translateService : TranslateService) {
        this.profileDropdown = false;
        this.username = '';


        keycloakService.getToken().then((token) => {
            this.username = keycloakService.getUsername()
        })
    }

    toggleDropdown() {
        this.profileDropdown = !this.profileDropdown;
    }

    sideBarOpen() {
        this.openSidebar.emit();
    }

    logout() {
        this.keycloakService.logout().then(() => this.keycloakService.clearToken());
    }

    ChangeLang(lang: any) {
        const selectedLanguage = lang.target.value;
        console.log("selectedLanguage")
        console.log(selectedLanguage)
        localStorage.setItem('lang',selectedLanguage);
        this.translateService.use(selectedLanguage);
        console.log("selectedLanguagetranslateService")
        console.log( this.translateService.use(selectedLanguage))
    }
}
