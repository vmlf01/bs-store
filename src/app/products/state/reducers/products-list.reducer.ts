import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsListActions } from '../actions/products-list.actions';
import * as ActionTypes from '../actions/products-list.actions';
import { IProduct } from '../../../../interfaces/IProduct';
import { AppError } from '../../../../interfaces/AppError';

export interface IProductsListState {
    products: IProduct[];
    isLoading: boolean;
    currentInitial: string;
    error: AppError;
}

export const initialProductsListState: IProductsListState = {
    products: [],
    isLoading: false,
    currentInitial: 'a',
    error: null,
};

export function productsListReducer(state: IProductsListState = initialProductsListState, action: ProductsListActions): IProductsListState {
    switch (action.type) {
        case ActionTypes.LOAD_PRODUCTS_LIST:
            return {
                ...state,
                isLoading: true,
                currentInitial: action.payload,
            };

        case ActionTypes.LOAD_PRODUCTS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.products,
            };

        case ActionTypes.LOAD_PRODUCTS_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                products: [],
                error: action.payload,
            };

        default:
            return state;
    }
}
