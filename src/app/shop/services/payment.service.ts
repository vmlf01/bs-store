import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';

import { IOrder } from '../../../interfaces/IOrder';
import { environment } from '../../../environments/environment';
import { IUserProfile } from '../../../interfaces/IUserProfile';

declare var StripeCheckout: any;

@Injectable()
export class PaymentService {
    stripeHandler: any;
    orders$: Subject<string>;

    order: IOrder;
    profile: IUserProfile;

    constructor(
        private afData: AngularFireDatabase,
    ) {
        this.orders$ = new Subject<string>();
        this.stripeHandler = this._initStripeHandler();
    }

    makePayment(order: IOrder, profile: IUserProfile): Observable<string> {
        this.order = order;
        this.profile = profile;

        this._openStripePaymentWindow();

        return this.orders$.take(1);
    }

    _initStripeHandler() {
        return StripeCheckout.configure({
            key: environment.stripeKey,
            image: 'assets/bs-store-icon-128.png',
            locale: 'auto',
            token: this._processOrder.bind(this),
        });
    }

    _openStripePaymentWindow() {
        const params = {
            name: 'Buy Something Store',
            description: '',
            amount: this._getStripeAmount(this.order),
            currency: this.order.currency,
            email: this.profile.email,
        };
        this.stripeHandler.open(params);
    }

    _processOrder(paymentToken: any) {
        const order = {
            ...this.order,
            status: 'PROCESSING_PAYMENT',
        };

        const orderRef = `/orders/${this.profile.id}`;
        this.afData.list(orderRef).push(order)
            .then(newOrderRef => newOrderRef.key)
            .then(orderId => {
                const payment = {
                    orderId: orderId,
                    token: paymentToken,
                    amount: this.order.total + this.order.shipping,
                    currency: this.order.currency,
                };

                const paymentRef = `/payments/${this.profile.id}`;
                return this.afData.list(paymentRef).push(payment)
                    .then(() => this.orders$.next(orderId));
            });
    }

    _getStripeAmount(order: IOrder) {
        return Math.floor((order.total + order.shipping) * 100);
    }
}
