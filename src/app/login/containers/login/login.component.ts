import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ILogin } from '../../../../interfaces/ILogin';
import { Login } from '../../state/actions/login.actions';
import { ShowSignup } from '../../state/actions/router.actions';
import { selectAuthError } from '../../login.store';
import { AppError } from '../../../../interfaces/AppError';

@Component({
    selector: 'bs-login',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-md-5 mx-auto mt-5 mb-5">
                    <bs-login-form
                        [error]="loginError$ | async"
                        (onLogin)="handleLogin($event)"
                        (onGoToSignup)="goToSignup()"
                    ></bs-login-form>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class LoginContainerComponent implements OnInit {
    loginError$: Observable<AppError>;

    constructor(
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.loginError$ = this.store.select(selectAuthError);
    }

    handleLogin(loginRequest: ILogin) {
        this.store.dispatch(new Login(loginRequest));
    }

    goToSignup() {
        this.store.dispatch(new ShowSignup());
    }
}
