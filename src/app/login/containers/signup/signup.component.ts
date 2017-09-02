import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILogin } from '../../../../interfaces/ILogin';
import { Signup } from '../../state/actions/login.actions';

@Component({
    selector: 'bs-signup',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-md-5 mx-auto mt-5 mb-5">
                    <bs-signup-form
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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>
    ) { }

    ngOnInit() {
    }

    handleSignup(loginRequest: ILogin) {
        this.store.dispatch(new Signup(loginRequest));
    }

    goToLogin() {
        this.router.navigate(['../login'], { relativeTo: this.route });
    }
}
