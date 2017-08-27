import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppProductsModule } from './products/app-products.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeContainerComponent } from './containers/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeContainerComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        AppProductsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
