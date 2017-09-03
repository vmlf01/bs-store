import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ILogin, LoginProvider } from '../../../interfaces/ILogin';
import { Login } from '../state/actions/login.actions';
import { AppError } from '../../../interfaces/AppError';

@Component({
    selector: 'bs-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    @Input() error: AppError = null;
    @Output() onLogin = new EventEmitter<ILogin>();
    @Output() onGoToSignup = new EventEmitter();

    LoginProviders = LoginProvider;
    loginForm: FormGroup;

    email = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    password = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
    ]);

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: this.email,
            password: this.password,
        });
    }

    login() {
        if (!this.loginForm.valid) {
            return;
        }

        const userLogin: ILogin = {
            provider: LoginProvider.EMail,
            email: this.email.value,
            password: this.password.value,
        };
        this.onLogin.emit(userLogin);
        this.loginForm.markAsPristine();
    }

    loginWithProvider(provider) {
        this.onLogin.emit({ provider });
    }

    goToSignup() {
        this.onGoToSignup.emit();
    }
}
