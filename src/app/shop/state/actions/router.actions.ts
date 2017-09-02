import { Action } from '@ngrx/store';

export const SHOW_PRODUCT_LIST = 'SHOW_PRODUCT_LIST';
export const SHOW_PRODUCT_DETAILS = 'SHOW_PRODUCT_DETAILS';
export const SHOW_SHOPPING_CART = 'SHOW_SHOPPING_CART';

export class ShowProductList implements Action {
    readonly type = SHOW_PRODUCT_LIST;
}

export class ShowProductDetails implements Action {
    readonly type = SHOW_PRODUCT_DETAILS;

    constructor(public readonly payload: string) {}
}

export class ShowShoppingCart implements Action {
    readonly type = SHOW_SHOPPING_CART;
}

export type ShopRouterActions =
    ShowProductList
    | ShowProductDetails
    | ShowShoppingCart
;
