import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingService } from './loading.service';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BsCurrencyPipe } from './bs-currency.pipe';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { LettersFilterBarComponent } from './letters-filter-bar/letters-filter-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { BsAlertService } from './bs-alert.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersService } from './users.service';
import { AddressEditorComponent } from './address-editor/address-editor.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoadingIndicatorComponent,
        BsCurrencyPipe,
        UserDropdownComponent,
        CartIconComponent,
        LettersFilterBarComponent,
        PageTitleComponent,
        UserProfileComponent,
        AddressEditorComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        LoadingIndicatorComponent,
        PageTitleComponent,
        LettersFilterBarComponent,
        BsCurrencyPipe,
        UserProfileComponent,
    ],
})
export class AppSharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppSharedModule,
            providers: [
                LoadingService,
                CurrencyPipe,
                BsAlertService,
                UsersService,
            ],
        };
    }
}
