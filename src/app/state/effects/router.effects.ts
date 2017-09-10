import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { IAppStore } from '../../app.store';

import { GoToHome, ResumeNavigation } from '../actions/app.actions';
import { ShowProductDetails } from '../../shop/state/actions/router.actions';
import * as LoginActionTypes from '../../login/state/actions/login.actions';
import * as LoginRouterActionTypes from '../../login/state/actions/router.actions';
import * as AppActionTypes from '../actions/app.actions';
import * as ShopActionTypes from '../../shop/state/actions/router.actions';
import { selectAuthRedirect } from '../../login/login.store';

@Injectable()
export class AppRouterEffects {
    constructor(
        private actions$: Actions,
        private store: Store<IAppStore>,
        private router: Router,
    ) {
    }

    @Effect() postAuthRedirect$ = this.actions$
        .ofType(
            LoginActionTypes.LOGIN_SUCCESS,
            LoginActionTypes.SIGNUP_SUCCESS,
        )
        .withLatestFrom(this.store.select(selectAuthRedirect))
        .map(([action, redirectUrl]) => redirectUrl ?
            new ResumeNavigation(redirectUrl) :
            new GoToHome()
        );

    @Effect() logoutRedirect$ = this.actions$
        .ofType(
            LoginActionTypes.LOGOUT_SUCCESS,
        )
        .map(() => new GoToHome());

    @Effect({ dispatch: false }) goToShop$ = this.actions$
        .ofType(
            AppActionTypes.GO_TO_HOME,
            ShopActionTypes.SHOW_PRODUCT_LIST,
        )
        .do(() => this.router.navigate(['/shop']));

    @Effect({ dispatch: false }) goToCart$ = this.actions$
        .ofType(ShopActionTypes.SHOW_SHOPPING_CART)
        .do(() => this.router.navigate(['/shop/cart']));

    @Effect({ dispatch: false }) goToShippingAddress$ = this.actions$
        .ofType(ShopActionTypes.SHOW_ORDER_SHIPPING_ADDRESS)
        .do(() => this.router.navigate(['/shop/shipping']));

    @Effect({ dispatch: false }) goToBillingAddress$ = this.actions$
        .ofType(ShopActionTypes.SHOW_ORDER_BILLING_ADDRESS)
        .do(() => this.router.navigate(['/shop/billing']));

    @Effect({ dispatch: false }) goToPayment$ = this.actions$
        .ofType(ShopActionTypes.SHOW_ORDER_PAYMENT)
        .do(() => this.router.navigate(['/shop/summary']));

    @Effect({ dispatch: false }) goToDetails$ = this.actions$
        .ofType<ShowProductDetails>(ShopActionTypes.SHOW_PRODUCT_DETAILS)
        .do((action) => this.router.navigate(['/shop', action.payload]));

    @Effect({ dispatch: false }) goToLogin$ = this.actions$
        .ofType(LoginRouterActionTypes.SHOW_LOGIN)
        .do(() => this.router.navigate(['/login']));

    @Effect({ dispatch: false }) goToSignup$ = this.actions$
        .ofType(LoginRouterActionTypes.SHOW_SIGNUP)
        .do(() => this.router.navigate(['/signup']));

    @Effect({ dispatch: false }) goToProductsManagement$ = this.actions$
        .ofType(AppActionTypes.GO_TO_PRODUCTS_MANAGEMENT)
        .do(() => this.router.navigate(['/manage/products']));

    @Effect({ dispatch: false }) goToUsersManagement$ = this.actions$
        .ofType(AppActionTypes.GO_TO_USERS_MANAGEMENT)
        .do(() => this.router.navigate(['/manage/users']));

    @Effect({ dispatch: false }) goToOrdersManagement$ = this.actions$
        .ofType(AppActionTypes.GO_TO_ORDERS_MANAGEMENT)
        .do(() => this.router.navigate(['/manage/orders']));

    @Effect({ dispatch: false }) goToMyProfile$ = this.actions$
        .ofType(AppActionTypes.GO_TO_MY_PROFILE)
        .do(() => this.router.navigate(['/profile']));

    @Effect({ dispatch: false }) resumeNavigation$ = this.actions$
        .ofType<ResumeNavigation>(AppActionTypes.RESUME_NAVIGATION)
        .do(action => this.router.navigateByUrl(action.payload));
}
