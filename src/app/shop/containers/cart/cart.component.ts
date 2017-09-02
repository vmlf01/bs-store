import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ICartContents } from '../../../../interfaces/ICartContents';
import { IProduct } from '../../../../interfaces/IProduct';
import { ChangeItemQuantity, CheckoutCart, RemoveFromCart } from '../../state/actions/cart.actions';
import { selectCartContents } from '../../shop.store';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

@Component({
    selector: 'bs-cart',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <bs-cart-contents
                        [contents]="contents"
                        (updateItemQuantity)="updateItemQuantity($event)"
                        (checkout)="checkoutCart()"
                        (continueShopping)="continueShopping()"
                        (showItemDetails)="showItemDetails($event)"
                        (removeItem)="removeCartItem($event)"
                    ></bs-cart-contents>
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
export class CartContainerComponent implements OnInit, OnDestroy {
    contents: ICartContents;

    private subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>
    ) {
    }

    ngOnInit() {
        this.registerSubscriptions();
    }

    ngOnDestroy() {
        this.unregisterSubscriptions();
    }

    registerSubscriptions() {
        this.subscriptions = [
            this.store.select(selectCartContents)
                .subscribe(state => {
                    this.contents = state;
                }),
        ];
    }

    unregisterSubscriptions() {
        this.subscriptions
            .forEach(subscription => subscription.unsubscribe());
    }

    updateItemQuantity({ item, quantity }: { item: IOrderItem, quantity: number }) {
        this.store.dispatch(new ChangeItemQuantity({ product: item, quantity: quantity }));
    }

    checkoutCart() {
        this.store.dispatch(new CheckoutCart());
    }

    continueShopping() {
        this.router.navigate([''], { relativeTo: this.route.parent });
    }

    showItemDetails(product: IOrderItem) {
        this.router.navigate([product.id], { relativeTo: this.route.parent });
    }

    removeCartItem(product: IOrderItem) {
        this.store.dispatch(new RemoveFromCart(product));
    }
}
