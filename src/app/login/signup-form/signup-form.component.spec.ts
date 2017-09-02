import { Observable } from 'rxjs/Observable';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { RecaptchaComponent, RecaptchaLoaderService } from 'ng-recaptcha';
import { RecaptchaValueAccessorDirective } from 'ng-recaptcha/forms';

import { SignupFormComponent } from './signup-form.component';

describe('SignUpFormComponent', () => {
    let component: SignupFormComponent;
    let fixture: ComponentFixture<SignupFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [SignupFormComponent, RecaptchaComponent, RecaptchaValueAccessorDirective],
            providers: [
                { provide: RecaptchaLoaderService, useValue: { ready: Observable.of() } },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
