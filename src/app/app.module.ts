import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as firebaseApp from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './shared/shared.module';
import { AppLoginModule } from './login/login.module';
import { appEffects, appReducers, storeOptions } from './app.store';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
        NgbModule.forRoot(),
        StoreModule.forRoot(appReducers, storeOptions),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot(appEffects),

        AngularFireModule.initializeApp(environment.firebase.config, environment.firebase.appName),
        AngularFireAuthModule,

        AppRoutingModule,
        AppSharedModule.forRoot(),
        AppLoginModule.forRoot(),
    ],
    providers: [{
        provide: RECAPTCHA_SETTINGS,
        useValue: { siteKey: environment.recaptchaSiteKey }
    }],
    bootstrap: [AppComponent],
})
export class AppModule { }
