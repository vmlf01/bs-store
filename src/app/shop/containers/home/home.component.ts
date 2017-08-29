import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import { LoadProductHighlight } from '../../state/actions/featured-product.actions';
import { LoadProducts } from '../../state/actions/product.actions';

import { IProduct } from '../../../../interfaces/IProduct';
import { selectFeaturedProduct, selectProducts } from '../../shop.store';

@Component({
    selector: 'bs-home',
    template: `
        <bs-product-highlight
            *ngIf="productHighlight"
            [product]="productHighlight"
            (productSelected)="showItemDetails($event)"
            (buyNowSelected)="addToCart($event)"
        ></bs-product-highlight>

        <div class="container">
            <bs-product-list
                [loading]="loading"
                [products]="products"
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

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
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
        this.router.navigate([product.id], { relativeTo: this.route });
    }

    addToCart(product: IProduct) {
        console.log('BUY', product);
    }
}
