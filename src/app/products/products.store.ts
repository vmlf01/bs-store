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

export const selectProducts = createFeatureSelector<IProductsStore>(productsFeatureName);
export const selectProductsList = createSelector(selectProducts, state => state.products);
