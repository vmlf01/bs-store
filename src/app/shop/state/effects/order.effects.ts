import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

import { MakeOrderPayment, SetOrderBillingAddress, SetOrderShippingAddress, OrderProcessedSuccess } from '../actions/cart.actions';
import { selectUserProfile } from '../../../login/login.store';
import { GoToHome } from '../../../state/actions/app.actions';
import * as ActionTypes from '../actions/cart.actions';
import * as LoginActionTypes from '../../../login/state/actions/login.actions';
import { ShowOrderBillingAddress, ShowOrderShippingAddress } from '../actions/router.actions';
import { PaymentService } from '../../services/payment.service';
import { BsAlertService } from '../../../shared/bs-alert.service';

@Injectable()
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private paymentService: PaymentService,
        private bsAlert: BsAlertService,
    ) {
    }

    @Effect() checkoutCart$ = this.actions$
        .ofType(ActionTypes.CHECKOUT_CART)
        .map(() => new ShowOrderShippingAddress());

    @Effect() makePayment$ = this.actions$
        .ofType<MakeOrderPayment>(ActionTypes.MAKE_ORDER_PAYMENT)
        .withLatestFrom(this.store.select(selectUserProfile))
        .switchMap(([action, profile]) => this.paymentService.makePayment(action.payload, profile)
            .map(orderId => new OrderProcessedSuccess(orderId))
        );

    @Effect() paymentDone$ = this.actions$
        .ofType(ActionTypes.ORDER_PROCESSED_SUCCESS)
        .map(() => {
            this.bsAlert.success({ title: 'Thank you!', text: 'Your order has been successfully submitted' });
            return new GoToHome();
        });


    @Effect({ dispatch: false }) logout$ = this.actions$
        .ofType(LoginActionTypes.LOGOUT_SUCCESS)
        .do(() => {
            this.store.dispatch(new SetOrderShippingAddress(null));
            this.store.dispatch(new SetOrderBillingAddress(null));
        });
}
