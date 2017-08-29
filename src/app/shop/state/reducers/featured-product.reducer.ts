import { Action, ActionReducer, createFeatureSelector } from '@ngrx/store';
import { IProduct } from '../../../../interfaces/IProduct';
import { FeaturedProductActions } from '../actions/featured-product.actions';
import * as ActionTypes from '../actions/featured-product.actions';

export interface IFeaturedProductState {
    product?: IProduct;
    isLoading: boolean;
}

export const initialFeaturedProductState: IFeaturedProductState = {
    isLoading: false,
};

export function featuredProductReducer(state: IFeaturedProductState = initialFeaturedProductState, action: FeaturedProductActions): IFeaturedProductState {
    switch (action.type) {
        case ActionTypes.LOAD_FEATURED_PRODUCT:
            return {
                ...state,
                isLoading: true,
            };

        case ActionTypes.LOAD_FEATURED_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};
