import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as ActionTypes from '../actions/product.actions';
import { LoadProductsSuccess } from '../actions/product.actions';
import { selectProducts } from '../../shop.store';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>
    ) {
    }

    @Effect() loadProducts = this.actions$
        .ofType(ActionTypes.LOAD_PRODUCTS)
        .delay(500)
        .withLatestFrom(this.store.select(selectProducts), (action, state) => state.products.length)
        .map(productCount => {
            return {
                products: this.getProducts(productCount),
                hasMore: true,
            };
        })
        .map(payload => new LoadProductsSuccess(payload));


    private getProducts(startingIndex) {
        return Array.from(Array(9).keys())
            .map(value => {
                return {
                    id: `item-${startingIndex + value + 1}`,
                    name: `Item ${startingIndex + value + 1}`,
                    image: 'http://placehold.it/700x400',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
                    price: 10 + Math.round(Math.random() * 5000) / 100,
                    currency: 'USD',
                    rating: Math.round(Math.random() * 5),
                };
            });
    }
}

