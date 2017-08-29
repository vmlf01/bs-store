import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions } from '../actions/product.actions';
import * as ActionTypes from '../actions/product.actions';
import { IProduct } from '../../../../interfaces/IProduct';

export interface IProductsState {
    products: IProduct[];
    isLoading: boolean;
    hasMoreProducts: boolean;
}

export const initialProductsState: IProductsState = {
    products: [],
    isLoading: false,
    hasMoreProducts: false,
};

export function productsReducer(state: IProductsState = initialProductsState, action) {
    switch (action.type) {
        case ActionTypes.LOAD_PRODUCTS:
            return {
                ...state,
                isLoading: true,
            };

        case ActionTypes.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products.concat(action.payload.products),
                hasMoreProducts: action.payload.hasMore,
                isLoading: false,
            };

        default:
            return state;
    }
}
