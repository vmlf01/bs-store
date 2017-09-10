import { GoToHome } from '../../../state/actions/app.actions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { selectCart } from '../../shop.store';
import { selectUserProfile } from '../../../login/login.store';
import { IOrder } from '../../../../interfaces/IOrder';
import { ShowOrderBillingAddress } from '../../state/actions/router.actions';
import { MakeOrderPayment } from '../../state/actions/cart.actions';

@Component({
    selector: 'bs-order-payment',
    template: `
        <bs-cart-container>
            <bs-order-summary
                *ngIf="order"
                [order]="order"
                (onBack)="handleBack()"
                (makePayment)="handlePayment()"
            ></bs-order-summary>
        </bs-cart-container>
    `,
    styles: []
})
export class OrderPaymentComponent implements OnInit {
    order: IOrder;

    constructor(
        private store: Store<any>,
    ) { }

    ngOnInit() {
        Observable.zip(
            this.store.select(selectUserProfile),
            this.store.select(selectCart),
        )
            .take(1)
            .subscribe(([profile, cart]) => {
                if (!profile || !cart.contents.items.length || !cart.shippingAddress || !cart.billingAddress) {
                    return this.store.dispatch(new GoToHome());
                }

                this.order = {
                    requesterId: profile.id,
                    requester: profile.name,
                    email: profile.email,
                    items: cart.contents.items,
                    currency: cart.contents.currency,
                    subtotal: cart.contents.total,
                    shipping: cart.contents.shipping,
                    total: cart.contents.total + cart.contents.shipping,
                    shippingAddress: cart.shippingAddress,
                    billingAddress: cart.billingAddress,
                    date: new Date().toISOString(),
                };
            });
    }

    handleBack() {
        this.store.dispatch(new ShowOrderBillingAddress());
    }

    handlePayment() {
        this.store.dispatch(new MakeOrderPayment(this.order));
    }
}
