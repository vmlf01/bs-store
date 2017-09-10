import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as ActionTypes from '../actions/featured-product.actions';
import { LoadProductHighlight, LoadProductHighlightSuccess } from '../actions/featured-product.actions';
import { selectFeaturedProduct } from '../../shop.store';
import { IFeaturedProductState } from '../reducers/featured-product.reducer';
import { ShopService } from '../../services/shop.service';

@Injectable()
export class FeaturedProductEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private shopService: ShopService,
    ) {
    }

    @Effect() loadFeaturedProduct$ = this.actions$
        .ofType(ActionTypes.LOAD_FEATURED_PRODUCT)
        .switchMap(() => {
            return this.shopService.getFeaturedProduct()
                .map(featured => new LoadProductHighlightSuccess(featured));
        });
}
