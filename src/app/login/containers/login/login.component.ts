import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILogin } from '../../../../interfaces/ILogin';
import { Login } from '../../state/actions/login.actions';

@Component({
    selector: 'bs-login',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-md-5 mx-auto mt-5 mb-5">
                    <bs-login-form
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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>
    ) { }

    ngOnInit() {
    }

    handleLogin(loginRequest: ILogin) {
        this.store.dispatch(new Login(loginRequest));
    }

    goToSignup() {
        this.router.navigate(['../signup'], { relativeTo: this.route });
    }
}
