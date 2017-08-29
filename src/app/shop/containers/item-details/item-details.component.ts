import { LoadProductDetails } from '../../state/actions/product.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import { IProduct } from '../../../../interfaces/IProduct';
import { selectProducts } from '../../shop.store';

@Component({
    selector: 'bs-item-details',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <bs-product-details
                        *ngIf="product"
                        [product]="product"
                        (buyNowSelected)="addToCart($event)"
                    ></bs-product-details>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            padding: 50px 0;
        }
    `]
})
export class ItemDetailsContainerComponent implements OnInit, OnDestroy {
    product: IProduct;

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
    }

    ngOnInit() {
        this.registerSubscriptions();
        this.loadItemDetails(this.route.snapshot.params.id);
    }

    ngOnDestroy() {
        this.unregisterSubscriptions();
    }

    registerSubscriptions() {
        this.subscriptions = [
            this.store.select(selectProducts)
                .subscribe(state => {
                    this.product = state.productDetails;
                }),
        ];
    }

    unregisterSubscriptions() {
        this.subscriptions
            .forEach(subscription => subscription.unsubscribe());
    }

    loadItemDetails(id: string) {
        this.store.dispatch(new LoadProductDetails(id));
    }

    addToCart(product: IProduct) {
        console.log('BUY', product);
    }
}
