import { ProductRatingComponent } from './products/product-rating/product-rating.component';
import { ProductHighlightComponent } from './products/product-highlight/product-highlight.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ItemDetailsContainerComponent } from './containers/item-details/item-details.component';
import { HomeContainerComponent } from './containers/home/home.component';

import { routes } from './shop.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        HomeContainerComponent,
        ItemDetailsContainerComponent,
        ProductListComponent,
        ProductCardComponent,
        ProductDetailsComponent,
        ProductHighlightComponent,
        ProductRatingComponent
    ],
    exports: [
    ],
})
export class AppShopModule { }
