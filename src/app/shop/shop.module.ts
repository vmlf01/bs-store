import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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

import { AppSharedModule } from '../shared/shared.module';
import { routes } from './shop.routes';
import { initialShopState, IShopStore, shopReducers, shopFeatureName } from './shop.store';
import { shopEffects } from './shop.effects';
import { CartContentsComponent } from './cart/cart-contents/cart-contents.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartTotalsComponent } from './cart/cart-totals/cart-totals.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { CartEmptyComponent } from './cart/cart-empty/cart-empty.component';
import { ShopService } from './services/shop.service';
import { OrderShippingComponent } from './containers/order-shipping/order-shipping.component';
import { OrderBillingComponent } from './containers/order-billing/order-billing.component';
import { OrderPaymentComponent } from './containers/order-payment/order-payment.component';
import { CartContainerComponent } from './cart/cart-container/cart-container.component';
import { ShoppingCartContainerComponent } from './containers/shopping-cart/shopping-cart.component';
import { CartAddressComponent } from './cart/cart-address/cart-address.component';
import { OrderSummaryComponent } from './cart/order-summary/order-summary.component';
import { PaymentService } from "./services/payment.service";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature<IShopStore>(shopFeatureName, shopReducers, { initialState: initialShopState }),
        EffectsModule.forFeature(shopEffects),
        AppSharedModule,
    ],
    declarations: [
        HomeContainerComponent,
        ItemDetailsContainerComponent,
        ShoppingCartContainerComponent,
        ProductListComponent,
        ProductCardComponent,
        ProductDetailsComponent,
        ProductHighlightComponent,
        ProductRatingComponent,
        CartContentsComponent,
        CartDetailsComponent,
        CartItemComponent,
        CartTotalsComponent,
        CartEmptyComponent,
        OrderShippingComponent,
        OrderBillingComponent,
        OrderPaymentComponent,
        CartContainerComponent,
        CartAddressComponent,
        OrderSummaryComponent,
    ],
    providers: [
        ShopService,
        PaymentService,
    ],
})
export class AppShopModule { }
