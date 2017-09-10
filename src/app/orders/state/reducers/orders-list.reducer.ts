import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import { OrdersListActions } from '../actions/orders-list.actions';
import * as ActionTypes from '../actions/orders-list.actions';
import { IOrder } from '../../../../interfaces/IOrder';
import { AppError } from '../../../../interfaces/AppError';

export interface IOrdersListState {
    orders: IOrder[];
    isLoading: boolean;
    error: AppError;
}

export const initialOrdersListState: IOrdersListState = {
    orders: [],
    isLoading: false,
    error: null,
};

export function ordersListReducer(state: IOrdersListState = initialOrdersListState, action: OrdersListActions): IOrdersListState {
    switch (action.type) {
        case ActionTypes.LOAD_ORDERS_LIST:
            return {
                ...state,
                isLoading: true,
            };

        case ActionTypes.LOAD_ORDERS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders: action.payload.orders,
            };

        case ActionTypes.LOAD_ORDERS_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                orders: [],
                error: action.payload,
            };

        default:
            return state;
    }
}
