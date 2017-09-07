import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { LoginProvider } from '../../../../interfaces/ILogin';
import * as ActionTypes from '../actions/login.actions';
import {
    Login,
    LoginFailure,
    LoginSuccess,
    Logout,
    LogoutSuccess,
    Signup,
    SignupFailure,
    SignupSuccess,
    UserAuthenticationNeeded,
    SetUserAuthentication,
} from '../actions/login.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { ShowLogin } from '../actions/router.actions';

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private authService: AuthenticationService
    ) {
        this.authService.getAuthState()
            .subscribe(user => this.store.dispatch(new SetUserAuthentication(user)));
    }

    @Effect() doAuthentication$ = this.actions$
        .ofType<UserAuthenticationNeeded>(ActionTypes.USER_AUTHENTICATION_NEEDED)
        .map(() => new ShowLogin());

    @Effect() login$ = this.actions$
        .ofType<Login>(ActionTypes.LOGIN)
        .switchMap((action) => {
            return this._doLogin(action)
                .map(() => new LoginSuccess())
                .catch(error => Observable.of(new LoginFailure(error)));
        });

    @Effect() signup$ = this.actions$
        .ofType<Signup>(ActionTypes.SIGNUP)
        .switchMap((action) => {
            return this._doSignup(action)
                .map(() => new SignupSuccess())
                .catch(error => Observable.of(new SignupFailure(error)));
        });

    @Effect() logout$ = this.actions$
        .ofType<Logout>(ActionTypes.LOGOUT)
        .switchMap(() => this.authService.logout().map(payload => new LogoutSuccess()));

    _doLogin(action): Observable<void> {
        switch (action.payload.provider) {
            case LoginProvider.EMail:
                return this.authService.login(action.payload.email, action.payload.password);

            case LoginProvider.Facebook:
                return this.authService.loginWithFacebook();

            case LoginProvider.GitHub:
                return this.authService.loginWithGitHub();

            default:
                Observable.throw(new Error('Login provider not available!'));
        }
    }

    _doSignup(action): Observable<void> {
        switch (action.payload.provider) {
            case LoginProvider.EMail:
                return this.authService.register(action.payload.email, action.payload.password, action.payload.recaptcha);

            case LoginProvider.Facebook:
                return this.authService.loginWithFacebook();

            case LoginProvider.GitHub:
                return this.authService.loginWithGitHub();

            default:
                Observable.throw(new Error('Login provider not available!'));
        }
    }
}
