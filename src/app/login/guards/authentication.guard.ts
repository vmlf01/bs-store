import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { UserAuthenticationNeeded } from '../state/actions/login.actions';
import { selectIsAuthenticated } from '../login.store';

@Injectable()
export class AuthorizationGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private store: Store<any>
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._ensureUserIsAuthenticated(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._ensureUserIsAuthenticated(childRoute, state);
    }

    canLoad(route: Route) {
        return true;
    }

    _ensureUserIsAuthenticated(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(selectIsAuthenticated)
            .do(isAuthenticated => {
                if (!isAuthenticated) {
                    this.store.dispatch(new UserAuthenticationNeeded(state.url));
                }
            });
    }
}
