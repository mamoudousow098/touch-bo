import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {KeycloakAuthGuard, KeycloakEventType, KeycloakService} from 'keycloak-angular';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(
        protected override readonly router: Router,
        protected readonly keycloak: KeycloakService
    ) {
        super(router, keycloak);
        this.keycloak.keycloakEvents$.subscribe({
            next: (event) => {
                console.log("Keycloak event:", event.type);
                if (event.type === KeycloakEventType.OnTokenExpired || event.type === KeycloakEventType.OnAuthLogout) {
                    this.keycloak.logout().then(() => this.keycloak.clearToken());
                }
            },
        });
    }

    async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url,
            });
        }
        let roles = route.data?.['roles'] as Array<string>;
        if (roles.length > 0)
            return roles.filter(role => this.keycloak.isUserInRole(role)).length > 0;
        return true;
    }
}
