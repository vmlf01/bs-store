import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { IProduct } from '../../interfaces/IProduct';
import { initialProductsListState, IProductsListState, productsListReducer } from './state/reducers/products-list.reducer';

export interface IProductsStore {
    products: IProductsListState;
}

export const initialState: IProductsStore = {
    products: initialProductsListState,
};

export const reducers: ActionReducerMap<IProductsStore> = {
    products: productsListReducer,
};

export const productsFeatureName = 'products';

export const selectProductsFeature = createFeatureSelector<IProductsStore>(productsFeatureName);
export const selectProducts = createSelector(selectProductsFeature, state => state.products);
export const selectProductsList = createSelector(selectProducts, state => state && state.products);
