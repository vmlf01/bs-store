import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingService } from './loading.service';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BsCurrencyPipe } from './bs-currency.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoadingIndicatorComponent,
        BsCurrencyPipe,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        LoadingIndicatorComponent,
        BsCurrencyPipe,
    ],
})
export class AppSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppSharedModule,
            providers: [
                LoadingService,
                CurrencyPipe,
            ],
        };
    }
}
