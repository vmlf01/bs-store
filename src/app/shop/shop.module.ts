import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppProductsModule } from '../products/app-products.module';

import { ItemDetailsContainerComponent } from './containers/item-details/item-details.component';
import { HomeContainerComponent } from './containers/home/home.component';

import { routes } from './shop.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppProductsModule,
    ],
    declarations: [
        HomeContainerComponent,
        ItemDetailsContainerComponent,
    ],
    exports: [
    ],
})
export class AppShopModule { }
