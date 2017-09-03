import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ILogin } from '../../../../interfaces/ILogin';
import { Signup } from '../../state/actions/login.actions';
import { ShowLogin } from '../../state/actions/router.actions';
import { selectAuthError } from '../../login.store';
import { AppError } from '../../../../interfaces/AppError';

@Component({
    selector: 'bs-signup',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-md-5 mx-auto mt-5 mb-5">
                    <bs-signup-form
                        [error]="signupError$ | async"
                        (onSignup)="handleSignup($event)"
                        (onGoToLogin)="goToLogin()"
                    ></bs-signup-form>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class SignupContainerComponent implements OnInit {
    signupError$: Observable<AppError>;

    constructor(
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.signupError$ = this.store.select(selectAuthError);
    }

    handleSignup(loginRequest: ILogin) {
        this.store.dispatch(new Signup(loginRequest));
    }

    goToLogin() {
        this.store.dispatch(new ShowLogin());
    }
}
