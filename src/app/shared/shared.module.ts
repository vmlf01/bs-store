import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingService } from './loading.service';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

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
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        LoadingIndicatorComponent,
    ],
})
export class AppSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppSharedModule,
            providers: [
                LoadingService,
            ],
        };
    }
}
