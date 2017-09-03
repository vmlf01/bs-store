import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/withLatestFrom';

import * as ActionTypes from '../actions/products-list.actions';
import { LoadProductsListSuccess } from '../actions/products-list.actions';

@Injectable()
export class ProductsListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>
    ) {
    }

    @Effect() loadProducts$ = this.actions$
        .ofType(ActionTypes.LOAD_PRODUCTS_LIST)
        .delay(500)
        .map(() => {
            return {
                products: this.getProducts(0),
                totalCount: 93,
            };
        })
        .map(payload => new LoadProductsListSuccess(payload));

    private getProducts(startingIndex) {
        return Array.from(Array(9).keys())
            .map(value => {
                return {
                    id: `item-${startingIndex + value + 1}`,
                    name: `Item ${startingIndex + value + 1}`,
                    image: '//placehold.it/700x400',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
                    price: 10 + Math.round(Math.random() * 5000) / 100,
                    currency: 'USD',
                    rating: Math.round(Math.random() * 5),
                };
            });
    }
}

