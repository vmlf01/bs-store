import { Action } from '@ngrx/store';

export const SHOW_PRODUCT_LIST = 'SHOW_PRODUCT_LIST';
export const SHOW_PRODUCT_DETAILS = 'SHOW_PRODUCT_DETAILS';
export const SHOW_SHOPPING_CART = 'SHOW_SHOPPING_CART';

export const SHOW_ORDER_SHIPPING_ADDRESS = 'SHOW_ORDER_SHIPPING_ADDRESS';
export const SHOW_ORDER_BILLING_ADDRESS = 'SHOW_ORDER_BILLING_ADDRESS';
export const SHOW_ORDER_PAYMENT = 'SHOW_ORDER_PAYMENT';

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

export class ShowOrderShippingAddress implements Action {
    readonly type = SHOW_ORDER_SHIPPING_ADDRESS;
}

export class ShowOrderBillingAddress implements Action {
    readonly type = SHOW_ORDER_BILLING_ADDRESS;
}

export class ShowOrderPayment implements Action {
    readonly type = SHOW_ORDER_PAYMENT;
}

export type ShopRouterActions =
    ShowProductList
    | ShowProductDetails
    | ShowShoppingCart
    | ShowOrderBillingAddress
    | ShowOrderShippingAddress
    | ShowOrderPayment
;
