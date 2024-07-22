import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Permissions} from "../../../../../commons/enums/Permissions";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    @Input()
    showMobileSideBar: boolean | undefined

    @Output()
    sidebarClosed = new EventEmitter

    Permissions = Permissions

    constructor(public keycloakService: KeycloakService) {
        console.log("User:"+ keycloakService.isUserInRole(Permissions.INDEX_AGENT));
    }

    toggleSidebar() {
        this.showMobileSideBar = !this.showMobileSideBar

        if (!this.showMobileSideBar)
            this.sidebarClosed.emit()
    }

}
