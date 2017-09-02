import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { IProduct } from '../../../../interfaces/IProduct';
import { selectProducts } from '../../shop.store';
import { AddToCart } from '../../state/actions/cart.actions';
import { LoadProductDetails } from '../../state/actions/product.actions';

@Component({
    selector: 'bs-item-details',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <bs-product-details
                        *ngIf="product"
                        [product]="product"
                        (buyNowSelected)="buyNow($event)"
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
        private router: Router,
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

    buyNow(product: IProduct) {
        this.store.dispatch(new AddToCart(product));
        this.router.navigate(['cart'], { relativeTo: this.route.parent });
    }
}
