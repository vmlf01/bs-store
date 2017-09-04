import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { IProduct } from '../../interfaces/IProduct';
import { initialProductsListState, IProductsListState, productsListReducer } from './state/reducers/products-list.reducer';
import { IProductDetailsState, initialProductDetailsState, productDetailsReducer } from './state/reducers/product-details.reducer';

export interface IProductsStore {
    products: IProductsListState;
    productDetails: IProductDetailsState;
}

export const initialState: IProductsStore = {
    products: initialProductsListState,
    productDetails: initialProductDetailsState,
};

export const reducers: ActionReducerMap<IProductsStore> = {
    products: productsListReducer,
    productDetails: productDetailsReducer,
};

export const productsFeatureName = 'products';

export const selectProductsFeature = createFeatureSelector<IProductsStore>(productsFeatureName);
export const selectProducts = createSelector(selectProductsFeature, state => state.products);
export const selectProductsList = createSelector(selectProducts, state => state && state.products);
export const selectProductDetails = createSelector(selectProductsFeature, state => state && state.productDetails);
