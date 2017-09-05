import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './shared/shared.module';
import { AppLoginModule } from './login/login.module';
import { appEffects, appReducers, storeOptions } from './app.store';

import { AppComponent } from './app.component';
import { CustomRouterStateSerializer } from './utils';
import { IPermissions, IRolePermissions } from './login/services/IPermissions';
import { AppPermissions } from './app.permissions';

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
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot(appEffects),
        StoreRouterConnectingModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase.config),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AppSharedModule.forRoot(),
        AppLoginModule.forRoot(),
    ],
    providers: [
        { provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.recaptchaSiteKey } },
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        { provide: IPermissions, useClass: AppPermissions }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
