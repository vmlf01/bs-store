import { Action } from '@ngrx/store';
import { IProduct } from '../../../../interfaces/IProduct';

export const LOAD_FEATURED_PRODUCT = 'LOAD_FEATURED_PRODUCT';
export const LOAD_FEATURED_PRODUCT_SUCCESS = 'LOAD_FEATURED_PRODUCT_SUCCESS';

export class LoadProductHighlight implements Action {
    readonly type = LOAD_FEATURED_PRODUCT;
}

export class LoadProductHighlightSuccess implements Action {
    readonly type = LOAD_FEATURED_PRODUCT_SUCCESS;
    constructor(public payload?: IProduct) {}
}

export type FeaturedProductActions =
    LoadProductHighlight
    | LoadProductHighlightSuccess
;
