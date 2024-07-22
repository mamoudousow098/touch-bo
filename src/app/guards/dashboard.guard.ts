import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {KeycloakService} from "keycloak-angular";
import { Permissions } from '../commons/enums/Permissions';

@Injectable({
    providedIn: 'root'
})
export class DashboardGuard {

    constructor(private keycloakService: KeycloakService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.keycloakService.isUserInRole(Permissions.SHOW_SYSTEM_STATS))
            return this.router.navigate(['/dashboard'])

        let resourceCode = this.keycloakService.getKeycloakInstance().tokenParsed["resource_code"]
        let resourceType = this.keycloakService.getKeycloakInstance().tokenParsed["resource_type"]

        console.log('tokenParsed: ', this.keycloakService.getKeycloakInstance().tokenParsed);

        if (resourceType != null && resourceCode != null) {

            if (resourceType == "aggregator" && this.keycloakService.isUserInRole(Permissions.SHOW_AGGREGATOR))
                return this.router.navigate(['/aggregator', resourceCode])

            if (resourceType == "wholesaler" && this.keycloakService.isUserInRole(Permissions.SHOW_WHOLESALER))
                return this.router.navigate(['/wholesaler/', resourceCode])
        }

        if (this.keycloakService.isUserInRole(Permissions.INDEX_CREDIT_REQUEST))
            return this.router.navigate(['/overview/credit-request'])

        if (this.keycloakService.isUserInRole(Permissions.INDEX_REFUND_REQUEST))
            return this.router.navigate(['/overview/refunds'])



        return this.router.navigate(['/forbidden'])
    }

}
