import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as ActionTypes from '../actions/product.actions';
import {
    LoadProductDetails,
    LoadProductDetailsSuccess,
    LoadProductsSuccess,
    ProductActions,
    LoadProducts,
} from '../actions/product.actions';
import { selectProducts } from '../../shop.store';
import { ShopService } from '../../services/shop.service';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private shopService: ShopService,
    ) {
    }

    @Effect() loadProducts$ = this.actions$
        .ofType<LoadProducts>(ActionTypes.LOAD_PRODUCTS)
        .withLatestFrom(this.store.select(selectProducts), (action, products) => products && products.nextPage)
        .switchMap(productId => this.shopService.getProducts(productId)
            .map(products => new LoadProductsSuccess(products))
        );

    @Effect() loadProductDetails$ = this.actions$
        .ofType<LoadProductDetails>(ActionTypes.LOAD_PRODUCT_DETAILS)
        .switchMap(action => this.shopService.getProductDetails(action.payload)
            .map(details => new LoadProductDetailsSuccess(details))
        );
}

