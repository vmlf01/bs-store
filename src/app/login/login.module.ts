import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppSharedModule } from '../shared/shared.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginContainerComponent } from './containers/login/login.component';
import { SignupContainerComponent } from './containers/signup/signup.component';
import { ILoginStore, initialLoginStoreState, LoginFeatureName, LoginReducers } from './login.store';
import { loginEffects } from './login.effects';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        StoreModule.forFeature<ILoginStore>(LoginFeatureName, LoginReducers, { initialState: initialLoginStoreState }),
        EffectsModule.forFeature(loginEffects),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AppSharedModule,
    ],
    declarations: [
        LoginFormComponent,
        SignupFormComponent,
        LoginContainerComponent,
        SignupContainerComponent,
    ],
    exports: [
        LoginFormComponent,
        SignupFormComponent,
        LoginContainerComponent,
        SignupContainerComponent,
    ],
})
export class AppLoginModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppLoginModule,
            providers: [
                AuthenticationService,
            ],
        };
    }
 }
