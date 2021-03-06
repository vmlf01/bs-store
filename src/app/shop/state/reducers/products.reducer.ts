import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions } from '../actions/product.actions';
import * as ActionTypes from '../actions/product.actions';
import { IProduct } from '../../../../interfaces/IProduct';

export interface IProductsState {
    products: IProduct[];
    nextPage: string;
    isLoading: boolean;
    hasMoreProducts: boolean;
    productDetails: IProduct;
}

export const initialProductsState: IProductsState = {
    products: [],
    nextPage: '',
    isLoading: false,
    hasMoreProducts: false,
    productDetails: null,
};

export function productsReducer(state: IProductsState = initialProductsState, action: ProductActions): IProductsState {
    switch (action.type) {
        case ActionTypes.LOAD_PRODUCTS:
            return {
                ...state,
                isLoading: true,
                products: action.payload ? [] : state.products,
                nextPage: action.payload ? '' : state.nextPage,
            };

        case ActionTypes.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: state.products.concat(action.payload.products),
                hasMoreProducts: !!action.payload.nextPage,
                nextPage: action.payload.nextPage,
            };

        case ActionTypes.LOAD_PRODUCT_DETAILS:
            return {
                ...state,
                isLoading: true,
                productDetails: null,
            };

        case ActionTypes.LOAD_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productDetails: action.payload,
            };

        default:
            return state;
    }
}
