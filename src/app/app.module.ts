import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { AppSharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppShopModule } from './shop/shop.module';

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
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
