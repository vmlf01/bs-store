import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsListActions } from '../actions/products-list.actions';
import * as ActionTypes from '../actions/products-list.actions';
import { IProduct } from '../../../../interfaces/IProduct';

export interface IProductsListState {
    products: IProduct[];
    isLoading: boolean;
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export const initialProductsListState: IProductsListState = {
    products: [],
    isLoading: false,
    totalCount: 0,
    currentPage: 0,
    totalPages: 0,
};

const ItemsPerPage = 10;

export function productsListReducer(state: IProductsListState = initialProductsListState, action: ProductsListActions): IProductsListState {
    switch (action.type) {
        case ActionTypes.LOAD_PRODUCTS_LIST:
            return {
                ...state,
                isLoading: true,
                currentPage: action.payload,
            };

        case ActionTypes.LOAD_PRODUCTS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.products,
                totalCount: action.payload.totalCount,
                totalPages: _getPageCount(action.payload.totalCount, ItemsPerPage),
            };

        default:
            return state;
    }
}

function _getPageCount(total, itemsPerPage) {
    return Math.ceil(total / itemsPerPage);
}
