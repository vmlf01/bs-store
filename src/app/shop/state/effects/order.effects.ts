import { SetUserAuthentication } from '../../../login/state/actions/login.actions';
import { SetOrderBillingAddress, SetOrderShippingAddress } from '../actions/cart.actions';
import { selectUserProfile } from '../../../login/login.store';
import { GoToHome } from '../../../state/actions/app.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as ActionTypes from '../actions/cart.actions';
import * as LoginActionTypes from '../../../login/state/actions/login.actions';
import { ShowOrderBillingAddress, ShowOrderShippingAddress } from '../actions/router.actions';

@Injectable()
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
    ) {
    }

    @Effect() checkoutCart$ = this.actions$
        .ofType(ActionTypes.CHECKOUT_CART)
        .map(() => new ShowOrderShippingAddress());

    @Effect({ dispatch: false }) login$ = this.actions$
        .ofType<SetUserAuthentication>(LoginActionTypes.SET_USER_AUTHENTICATION)
        .do(action => {
            if (action.payload) {
                this.store.dispatch(new SetOrderShippingAddress(action.payload.shippingAddress));
                this.store.dispatch(new SetOrderBillingAddress(action.payload.billingAddress));
            }
        });

    @Effect({ dispatch: false }) logout$ = this.actions$
        .ofType(LoginActionTypes.LOGOUT_SUCCESS)
        .do(() => {
            this.store.dispatch(new SetOrderShippingAddress(null));
            this.store.dispatch(new SetOrderBillingAddress(null));
        });
}
