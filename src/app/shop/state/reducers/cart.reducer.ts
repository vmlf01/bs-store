import { Action, ActionReducer, createFeatureSelector } from '@ngrx/store';

import { ICartContents } from '../../../../interfaces/ICartContents';
import * as ActionTypes from '../actions/cart.actions';
import { CartActions } from '../actions/cart.actions';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

export interface ICartState {
    contents: ICartContents;
    itemCount: number;
}

export const initialCartState: ICartState = {
    contents: {
        currency: 'USD',
        total: 0,
        shipping: 0,
        items: [],
    },
    itemCount: 0,
};

export function cartReducer(state: ICartState = initialCartState, action: CartActions): ICartState {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART: {
            let cartItems: IOrderItem[] = state.contents.items;
            const isItemInCart = cartItems.some(item => item.id === action.payload.id);

            if (!isItemInCart) {
                cartItems = [
                    ...cartItems,
                    {
                        ...action.payload,
                        quantity: 0,
                    },
                ];
            }

            cartItems = cartItems.map(item =>
                item.id === action.payload.id ?
                    { ...item, quantity: item.quantity + 1 } :
                    item
            );

            return {
                ...state,
                contents: {
                    ...state.contents,
                    items: cartItems,
                    total: calculateItemsTotal(cartItems),
                    shipping: calculateShipping(cartItems),
                },
                itemCount: calculateItemsCount(cartItems),
            };
        }

        case ActionTypes.CHANGE_ITEM_QUANTITY: {
            const cartItems: IOrderItem[] = state.contents.items.map(item =>
                item.id === action.payload.product.id ?
                    { ...item, quantity: action.payload.quantity } :
                    item
            );

            return {
                ...state,
                contents: {
                    ...state.contents,
                    items: cartItems,
                    total: calculateItemsTotal(cartItems),
                    shipping: calculateShipping(cartItems),
                },
                itemCount: calculateItemsCount(cartItems),
            };
        }

        case ActionTypes.REMOVE_FROM_CART: {
            const cartItems: IOrderItem[] = state.contents.items
                .filter(item => item.id !== action.payload.id);

            return {
                ...state,
                contents: {
                    ...state.contents,
                    items: cartItems,
                    total: calculateItemsTotal(cartItems),
                    shipping: calculateShipping(cartItems),
                },
                itemCount: calculateItemsCount(cartItems),
            };
        }

        default:
            return state;
    }
}

function calculateItemsCount(items: IOrderItem[]) {
    return items.reduce((total, item) => total + item.quantity, 0);
}

function calculateItemsTotal(items: IOrderItem[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateShipping(items: IOrderItem[]) {
    return items.length > 0 ? 3.5 : 0;
}
