import { selectUserProfile } from '../../../login/login.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';

import { SetOrderBillingAddress } from '../../state/actions/cart.actions';
import { IAddress } from '../../../../interfaces/IAddress';
import { ShowOrderShippingAddress, ShowOrderPayment } from '../../state/actions/router.actions';
import { selectCart } from '../../shop.store';

@Component({
    selector: 'bs-order-billing',
    template: `
        <bs-cart-container>
            <bs-cart-address
                [title]="'Please set Billing Address to use'"
                [address]="address$ | async"
                (onBack)="handleBack()"
                (onNext)="handleContinue($event)"
            ></bs-cart-address>
        </bs-cart-container>
    `,
    styles: []
})
export class OrderBillingComponent implements OnInit {
    address$: Observable<IAddress>;

    constructor(
        private store: Store<any>,
    ) { }

    ngOnInit() {
        this._initializeBillingAddress();
        this.address$ = this.store.select(selectCart).map(cart => cart.billingAddress);
    }

    _initializeBillingAddress() {
        Observable.zip(
            this.store.select(selectUserProfile),
            this.store.select(selectCart).map(cart => cart.billingAddress),
        )
            .take(1)
            .subscribe(([profile, address]) => {
                const initialAddress = {
                    street: address && address.street || profile.billingAddress && profile.billingAddress.street || '',
                    city: address && address.city || profile.billingAddress && profile.billingAddress.city || '',
                    zip: address && address.zip || profile.billingAddress && profile.billingAddress.zip || '',
                    country: address && address.country || profile.billingAddress && profile.billingAddress.country || '',
                };
                this.store.dispatch(new SetOrderBillingAddress(initialAddress));
            });
    }

    handleBack() {
        this.store.dispatch(new ShowOrderShippingAddress());
    }

    handleContinue(address) {
        this.store.dispatch(new SetOrderBillingAddress(address));
        this.store.dispatch(new ShowOrderPayment());
    }
}
