import { ICartContents } from '../../interfaces/ICartContents';
import { IProduct } from '../../interfaces/IProduct';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { initialProductsState, IProductsState, productsReducer } from './state/reducers/products.reducer';
import {
    featuredProductReducer,
    IFeaturedProductState,
    initialFeaturedProductState,
} from './state/reducers/featured-product.reducer';
import { ICartState, initialCartState, cartReducer } from './state/reducers/cart.reducer';

export interface IShopStore {
    products: IProductsState;
    featuredProduct: IFeaturedProductState;
    cart: ICartState;
}

export const initialShopState: IShopStore = {
    products: initialProductsState,
    featuredProduct: initialFeaturedProductState,
    cart: initialCartState,
};

export const shopReducers: ActionReducerMap<IShopStore> = {
    products: productsReducer,
    featuredProduct: featuredProductReducer,
    cart: cartReducer,
};

export const shopFeatureName = 'shop';

export const selectShop = createFeatureSelector<IShopStore>(shopFeatureName);
export const selectProducts = createSelector(selectShop, (state: IShopStore) => state.products);
export const selectFeaturedProduct = createSelector(selectShop, (state: IShopStore) => state.featuredProduct);
export const selectCart = createSelector(selectShop, (state: IShopStore) => state && state.cart);
export const selectCartContents = createSelector(selectCart, (state: ICartState) => state.contents);
export const selectCartCount = createSelector(selectCart, (state: ICartState) => state && state.itemCount || 0);
