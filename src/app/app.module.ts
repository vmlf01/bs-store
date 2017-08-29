import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppSharedModule } from './shared/shared.module';
import { AppShopModule } from './shop/shop.module';
import { AppRoutingModule } from './app-routing.module';
import { appEffects, appReducers, initialAppState, storeOptions } from './app.store';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        AppSharedModule.forRoot(),
        StoreModule.forRoot(appReducers, storeOptions),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot(appEffects),
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
