import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductRatingComponent } from './products/product-rating/product-rating.component';
import { ProductHighlightComponent } from './products/product-highlight/product-highlight.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ItemDetailsContainerComponent } from './containers/item-details/item-details.component';
import { HomeContainerComponent } from './containers/home/home.component';

import { routes } from './shop.routes';
import { initialShopState, IShopStore, shopReducers, shopFeatureName } from './shop.store';
import { shopEffects } from './shop.effects';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature<IShopStore>(shopFeatureName, shopReducers, { initialState: initialShopState }),
        EffectsModule.forFeature(shopEffects),
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
