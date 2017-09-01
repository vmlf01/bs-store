import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'bs-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;

    user = new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
    ]);

    password = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
    ]);

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            user: this.user,
            password: this.password,
        });
    }

    login() {
    }
}
