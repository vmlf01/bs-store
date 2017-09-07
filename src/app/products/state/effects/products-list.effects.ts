import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as ActionTypes from '../actions/products-list.actions';
import { LoadProductsListSuccess, LoadProductsList, LoadProductsListFailure } from '../actions/products-list.actions';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class ProductsListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private productsService: ProductsService
    ) {
    }

    @Effect() loadProducts$ = this.actions$
        .ofType<LoadProductsList>(ActionTypes.LOAD_PRODUCTS_LIST)
        .switchMap(action => {
            return this.productsService.getProducts(action.payload)
                .map(products => new LoadProductsListSuccess({ products }))
                .catch(error => Observable.of(new LoadProductsListFailure(error)));
        });
}

