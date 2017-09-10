import { selectUserProfile } from '../../../login/login.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';

import { SetOrderShippingAddress } from '../../state/actions/cart.actions';
import { IAddress } from '../../../../interfaces/IAddress';
import { ShowShoppingCart, ShowOrderBillingAddress } from '../../state/actions/router.actions';
import { selectCart } from '../../shop.store';

@Component({
    selector: 'bs-order-shipping',
    template: `
        <bs-cart-container>
            <bs-cart-address
                [title]="'Please set Shipping Address to use'"
                [address]="address$ | async"
                (onBack)="handleBack()"
                (onNext)="handleContinue($event)"
            ></bs-cart-address>
        </bs-cart-container>
    `,
    styles: []
})
export class OrderShippingComponent implements OnInit {
    address$: Observable<IAddress>;

    constructor(
        private store: Store<any>,
    ) { }

    ngOnInit() {
        this._initializeShippingAddress();
        this.address$ = this.store.select(selectCart).map(cart => cart.shippingAddress);
    }

    _initializeShippingAddress() {
        Observable.zip(
            this.store.select(selectUserProfile),
            this.store.select(selectCart).map(cart => cart.shippingAddress),
        )
            .take(1)
            .subscribe(([profile, address]) => {
                const initialAddress = {
                    street: address && address.street || profile.shippingAddress && profile.shippingAddress.street || '',
                    city: address && address.city || profile.shippingAddress && profile.shippingAddress.city || '',
                    zip: address && address.zip || profile.shippingAddress && profile.shippingAddress.zip || '',
                    country: address && address.country || profile.shippingAddress && profile.shippingAddress.country || '',
                };
                this.store.dispatch(new SetOrderShippingAddress(initialAddress));
            });
    }

    handleBack() {
        this.store.dispatch(new ShowShoppingCart());
    }

    handleContinue(address) {
        this.store.dispatch(new SetOrderShippingAddress(address));
        this.store.dispatch(new ShowOrderBillingAddress());
    }
}
