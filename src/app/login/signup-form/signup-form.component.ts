import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin, LoginProvider } from '../../../interfaces/ILogin';

@Component({
    selector: 'bs-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
    @Output() onSignup = new EventEmitter<ILogin>();
    @Output() onGoToLogin = new EventEmitter();

    LoginProviders = LoginProvider;
    signupForm: FormGroup;

    email = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    password = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
    ]);

    captcha = new FormControl('', [
        Validators.required,
    ]);

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: this.email,
            password: this.password,
            captcha: this.captcha,
        });
    }

    signup() {
        if (!this.signupForm.valid) {
            return;
        }

        const userLogin: ILogin = {
            provider: LoginProvider.EMail,
            email: this.email.value,
            password: this.password.value,
            recaptcha: this.captcha.value,
        };
        this.onSignup.emit(userLogin);
    }

    signupWithProvider(provider) {
        this.onSignup.emit({ provider });
    }

    goToLogin() {
        this.onGoToLogin.emit();
    }
}
