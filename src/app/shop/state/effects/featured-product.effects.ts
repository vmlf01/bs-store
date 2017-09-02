import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import * as ActionTypes from '../actions/featured-product.actions';
import { LoadProductHighlight, LoadProductHighlightSuccess } from '../actions/featured-product.actions';
import { selectFeaturedProduct } from '../../shop.store';
import { IFeaturedProductState } from '../reducers/featured-product.reducer';

@Injectable()
export class FeaturedProductEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>
    ) {
    }

    @Effect() loadFeaturedProduct$ = this.actions$
        .ofType(ActionTypes.LOAD_FEATURED_PRODUCT)
        .delay(500)
        .map(() => {
            return {
                id: 'item-0',
                name: 'Great Item!!!',
                image: 'http://placehold.it/700x400',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
                price: 24.99,
                currency: 'USD',
                rating: 4.5,
            };
        })
        .map(payload => new LoadProductHighlightSuccess(payload));
}
