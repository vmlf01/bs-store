import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { LoginProvider } from '../../../../interfaces/ILogin';
import * as ActionTypes from '../actions/login.actions';
import { Login, LoginFailure, LoginSuccess, Signup } from '../actions/login.actions';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private authService: AuthenticationService
    ) {
    }

    @Effect() login$ = this.actions$
        .ofType<Login>(ActionTypes.LOGIN)
        .switchMap((action) => {
            switch (action.payload.provider) {
                case LoginProvider.EMail:
                    return this.authService.login(action.payload.email, action.payload.password);

                case LoginProvider.Facebook:
                    return this.authService.loginWithFacebook();

                case LoginProvider.GitHub:
                    return this.authService.loginWithGitHub();

                default:
                    return Observable.of(new Error('Login provider not available!'));
            }
        })
        .map(payload => new LoginSuccess(payload))
        .catch(error => Observable.of(new LoginFailure()));

    @Effect() signup$ = this.actions$
        .ofType<Signup>(ActionTypes.SIGNUP)
        .switchMap((action) => {
            switch (action.payload.provider) {
                case LoginProvider.EMail:
                    return this.authService.register(action.payload.email, action.payload.password, action.payload.recaptcha);

                case LoginProvider.Facebook:
                    return this.authService.loginWithFacebook();

                case LoginProvider.GitHub:
                    return this.authService.loginWithGitHub();

                default:
                    return Observable.of(new Error('Login provider not available!'));
            }
        })
        .map(payload => new LoginSuccess(payload))
        .catch(error => Observable.of(new LoginFailure()));

}
