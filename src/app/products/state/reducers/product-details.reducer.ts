import { GO_TO_PRODUCTS_MANAGEMENT } from '../../../state/actions/app.actions';
import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductDetailsActions } from '../actions/product-details.actions';
import * as ActionTypes from '../actions/product-details.actions';
import { IProduct } from '../../../../interfaces/IProduct';
import { AppError } from '../../../../interfaces/AppError';

export interface IProductDetailsState {
    product: IProduct;
    isNew: boolean;
    isSaved: boolean;
    isReadOnly: boolean;
    error: AppError;
}

export const initialProductDetailsState: IProductDetailsState = {
    product: null,
    isNew: true,
    isSaved: false,
    isReadOnly: true,
    error: null,
};

export function productDetailsReducer(state: IProductDetailsState = initialProductDetailsState, action: ProductDetailsActions): IProductDetailsState {
    switch (action.type) {
        case ActionTypes.ADD_NEW_PRODUCT:
            return {
                ...state,
                product: null,
                isNew: true,
                isReadOnly: false,
                error: null
            };

        case ActionTypes.EDIT_EXISTING_PRODUCT:
            return {
                ...state,
                product: null,
                isNew: false,
                isReadOnly: false,
                error: null,
            };

        case ActionTypes.SHOW_EXISTING_PRODUCT:
            return {
                ...state,
                product: null,
                isNew: false,
                isReadOnly: true,
                error: null,
            };

        case ActionTypes.OPEN_PRODUCT_DETAILS_MODAL:
        case ActionTypes.SAVE_PRODUCT_DETAILS:
            return {
                ...state,
                isSaved: false,
                error: null,
                product: action.payload,
            };

        case ActionTypes.PRODUCT_SAVE_SUCCESS:
            return {
                ...state,
                isSaved: true,
            };

        case ActionTypes.CLOSE_PRODUCT_DETAILS_MODAL:
        case ActionTypes.CANCEL_PRODUCT_DETAILS_MODAL:
        case ActionTypes.DELETE_EXISTING_PRODUCT_SUCCESS:
            return {
                    ...state,
                    product: null,
                    error: null,
                };

        case ActionTypes.OPEN_PRODUCT_DETAILS_MODAL_FAILURE:
        case ActionTypes.PRODUCT_SAVE_FAILURE:
        case ActionTypes.DELETE_EXISTING_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
}
