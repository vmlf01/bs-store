import { LoadProducts } from '../../state/actions/product.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import { IProductsState } from '../../state/reducers/products.reducer';

import { LoadingService } from '../../../shared/loading.service';
import { IProduct } from '../../../../interfaces/IProduct';
import { IShopStore, selectProducts } from '../../shop.store';

@Component({
    selector: 'bs-home',
    template: `
        <bs-product-highlight
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

    private productsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loadingService: LoadingService,
        private store: Store<IShopStore>
    ) {
    }

    ngOnInit() {
        this.productHighlight = {
            id: 'item-0',
            name: 'Great Item!!!',
            image: 'http://placehold.it/700x400',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
            price: 24.99,
            currency: 'USD',
            rating: 4.5,
        };

        this.productsSubscription = this.store.select(selectProducts)
            .subscribe(state => {
                this.loading = state.isLoading;
                this.products = state.products;
            });

        this.loadMoreItems();
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
    }

    showItemDetails(product: IProduct) {
        this.router.navigate([product.id], { relativeTo: this.route });
    }

    addToCart(product: IProduct) {
        console.log('BUY', product);
    }

    loadMoreItems() {
        this.store.dispatch(new LoadProducts());

            // this.loadingService.show();
            // this.loadingService.hide();
    }
}
