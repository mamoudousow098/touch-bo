import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomRouteReuseStrategy extends RouteReuseStrategy {
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return null
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    }

}
