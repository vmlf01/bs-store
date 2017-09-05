import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private authService: AuthorizationService,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const permission = route.data['permission'];
        return !permission || this.authService.hasPermissionTo(permission);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const permission = childRoute.data['permission'] || childRoute.parent.data['permission'];
        return !permission || this.authService.hasPermissionTo(permission);
    }

    canLoad(route: Route) {
        const permission = route.data['permission'];
        return !permission || this.authService.hasPermissionTo(permission);
    }
}
