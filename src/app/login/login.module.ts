import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '../shared/shared.module';

import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppSharedModule,
    ],
    declarations: [
        LoginFormComponent,
    ],
    exports: [
        LoginFormComponent,
    ],
})
export class AppLoginModule { }
