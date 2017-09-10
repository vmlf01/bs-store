import { Action } from '@ngrx/store';
import { IProduct } from '../../../../interfaces/IProduct';
import { ICartContents } from '../../../../interfaces/ICartContents';
import { IOrderItem } from '../../../../interfaces/IOrderItem';
import { IAddress } from '../../../../interfaces/IAddress';
import { IOrder } from '../../../../interfaces/IOrder';

export const ADD_TO_CART = 'ADD_TO_CART';
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHECKOUT_CART = 'CHECKOUT_CART';

export const SET_ORDER_SHIPPING_ADDRESS = 'SET_ORDER_SHIPPING_ADDRESS';
export const SET_ORDER_BILLING_ADDRESS = 'SET_ORDER_BILLING_ADDRESS';
export const MAKE_ORDER_PAYMENT = 'MAKE_ORDER_PAYMENT';
export const ORDER_PROCESSED_SUCCESS = 'ORDER_PROCESSED_SUCCESS';

export class AddToCart implements Action {
    readonly type = ADD_TO_CART;
    constructor(public readonly payload: IProduct) {}
}

export class ChangeItemQuantity implements Action {
    readonly type = CHANGE_ITEM_QUANTITY;
    constructor(public readonly payload: { product: IOrderItem, quantity: number }) {}
}

export class RemoveFromCart implements Action {
    readonly type = REMOVE_FROM_CART;
    constructor(public readonly payload: IOrderItem) {}
}

export class CheckoutCart implements Action {
    readonly type = CHECKOUT_CART;
}

export class SetOrderShippingAddress implements Action {
    readonly type = SET_ORDER_SHIPPING_ADDRESS;
    constructor(public readonly payload: IAddress) {}
}

export class SetOrderBillingAddress implements Action {
    readonly type = SET_ORDER_BILLING_ADDRESS;
    constructor(public readonly payload: IAddress) {}
}

export class MakeOrderPayment implements Action {
    readonly type = MAKE_ORDER_PAYMENT;
    constructor(public readonly payload: IOrder) {}
}

export class OrderProcessedSuccess implements Action {
    readonly type = ORDER_PROCESSED_SUCCESS;
    constructor(public readonly payload: string) {}
}

export type CartActions =
    AddToCart
    | ChangeItemQuantity
    | RemoveFromCart
    | CheckoutCart
    | SetOrderShippingAddress
    | SetOrderBillingAddress
    | MakeOrderPayment
    | OrderProcessedSuccess
;
