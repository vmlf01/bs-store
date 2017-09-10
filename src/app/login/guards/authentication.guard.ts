import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthorizationService } from '../services/authorization.service';
import { UserAuthenticationNeeded } from '../state/actions/login.actions';

@Injectable()
export class AuthorizationGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private authService: AuthorizationService,
        private store: Store<any>,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const permission = route.data['permission'];
        return this._checkAuthorization(permission, state.url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const permission = childRoute.data['permission'] || childRoute.parent.data['permission'];
        return this._checkAuthorization(permission, state.url);
    }

    canLoad(route: Route) {
        const permission = route.data['permission'];
        return this._checkAuthorization(permission, route.path);
    }

    _checkAuthorization(permission: string, targetUrl: string) {
        const hasPermission = !permission || this.authService.hasPermissionTo(permission);

        if (!hasPermission) {
            this.store.dispatch(new UserAuthenticationNeeded(targetUrl));
        }

        return hasPermission;
    }
}
