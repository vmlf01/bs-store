import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/do';

import { LoadingService } from '../../shared/loading.service';
import * as ProductActionTypes from '../../shop/state/actions/product.actions';
import * as LoginActionTypes from '../../login/state/actions/login.actions';
import * as ProductListActionTypes from '../../products/state/actions/products-list.actions';

@Injectable()
export class LoadingEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private loadingService: LoadingService
    ) {
    }

    @Effect({ dispatch: false }) showLoading$ = this.actions$
        .ofType(
            ProductActionTypes.LOAD_PRODUCTS,
            ProductActionTypes.LOAD_PRODUCT_DETAILS,
            LoginActionTypes.LOGIN,
            LoginActionTypes.SIGNUP,
            ProductListActionTypes.LOAD_PRODUCTS_LIST,
        )
        .do(() => this.loadingService.show());

    @Effect({ dispatch: false }) hideLoading$ = this.actions$
        .ofType(
            ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
            ProductActionTypes.LOAD_PRODUCT_DETAILS_SUCCESS,
            LoginActionTypes.LOGIN_SUCCESS,
            LoginActionTypes.LOGIN_FAILURE,
            LoginActionTypes.SIGNUP_SUCCESS,
            LoginActionTypes.SIGNUP_FAILURE,
            ProductListActionTypes.LOAD_PRODUCTS_LIST_SUCCESS,
            ProductListActionTypes.LOAD_PRODUCTS_LIST_FAILURE,
        )
        .do(() => this.loadingService.hide());
}
