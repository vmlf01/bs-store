import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { LoadProductHighlight } from '../../state/actions/featured-product.actions';
import { LoadProducts } from '../../state/actions/product.actions';

import { IProduct } from '../../../../interfaces/IProduct';
import { selectFeaturedProduct, selectProducts } from '../../shop.store';
import { AddToCart } from '../../state/actions/cart.actions';
import { ShowProductDetails, ShowShoppingCart } from '../../state/actions/router.actions';

@Component({
    selector: 'bs-home',
    template: `
        <bs-product-highlight
            *ngIf="productHighlight"
            [product]="productHighlight"
            (productSelected)="showItemDetails($event)"
            (buyNowSelected)="buyNow($event)"
        ></bs-product-highlight>

        <div class="container">
            <bs-product-list
                [loading]="loading"
                [products]="products"
                [hasMore]="hasMore"
                (productSelected)="showItemDetails($event)"
                (loadMoreSelected)="loadMoreItems()"
            ></bs-product-list>
        </div>
    `,
    styles: []
})
export class HomeContainerComponent implements OnInit, OnDestroy {
    productHighlight: IProduct;
    products: IProduct[] = [];
    loading: boolean;
    hasMore: boolean;

    private subscriptions: Subscription[] = [];

    constructor(
        private store: Store<any>
    ) {
    }

    ngOnInit() {
        this.registerSubscriptions();
        this.loadMoreItems(true);
        this.loadFeaturedProduct();
    }

    ngOnDestroy() {
        this.unregisterSubscriptions();
    }

    registerSubscriptions() {
        this.subscriptions = [
            this.store.select(selectProducts)
                .subscribe(state => {
                    this.loading = state.isLoading;
                    this.products = state.products;
                    this.hasMore = state.hasMoreProducts;
                }),
            this.store.select(selectFeaturedProduct)
                .subscribe(state => {
                    this.productHighlight = state.product;
                }),
        ];
    }

    unregisterSubscriptions() {
        this.subscriptions
            .forEach(subscription => subscription.unsubscribe());
    }

    loadFeaturedProduct() {
        this.store.dispatch(new LoadProductHighlight());
    }

    loadMoreItems(reset = false) {
        this.store.dispatch(new LoadProducts(reset));
    }

    showItemDetails(product: IProduct) {
        this.store.dispatch(new ShowProductDetails(product.id));
    }

    buyNow(product: IProduct) {
        this.store.dispatch(new AddToCart(product));
        this.store.dispatch(new ShowShoppingCart());
    }
}
