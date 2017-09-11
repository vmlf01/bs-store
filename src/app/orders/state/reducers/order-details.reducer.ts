import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderDetailsActions } from '../actions/order-details.actions';
import * as ActionTypes from '../actions/order-details.actions';
import { IOrder } from '../../../../interfaces/IOrder';
import { AppError } from '../../../../interfaces/AppError';

export interface IOrderDetailsState {
    order: IOrder;
    error: AppError;
}

export const initialOrderDetailsState: IOrderDetailsState = {
    order: null,
    error: null,
};

export function orderDetailsReducer(state: IOrderDetailsState = initialOrderDetailsState, action: OrderDetailsActions): IOrderDetailsState {
    switch (action.type) {
        case ActionTypes.LOAD_ORDER_DETAILS_MANAGEMENT:
            return {
                ...state,
                order: null,
                error: null,
            };

        case ActionTypes.LOAD_ORDER_DETAILS_MANAGEMENT_SUCCESS:
            return {
                ...state,
                error: null,
                order: action.payload,
            };

        case ActionTypes.LOAD_ORDER_DETAILS_MANAGEMENT_FAILURE:
        case ActionTypes.UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        case ActionTypes.UPDATE_ORDER_STATUS:
        case ActionTypes.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}
