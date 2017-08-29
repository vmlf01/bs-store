import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { LoadingService } from '../../shared/loading.service';
import * as ProductActionTypes from '../../shop/state/actions/product.actions';

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
            ProductActionTypes.LOAD_PRODUCT_DETAILS
        )
        .do(() => this.loadingService.show());

    @Effect({ dispatch: false }) hideLoading$ = this.actions$
        .ofType(
            ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
            ProductActionTypes.LOAD_PRODUCT_DETAILS_SUCCESS
        )
        .do(() => this.loadingService.hide());
}
