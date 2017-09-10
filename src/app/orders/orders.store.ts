import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { IOrder } from '../../interfaces/IOrder';
import { initialOrdersListState, IOrdersListState, ordersListReducer } from './state/reducers/orders-list.reducer';

export interface IOrdersStore {
    orders: IOrdersListState;
}

export const initialState: IOrdersStore = {
    orders: initialOrdersListState,
};

export const reducers: ActionReducerMap<IOrdersStore> = {
    orders: ordersListReducer,
};

export const ordersFeatureName = 'orders';

export const selectOrdersFeature = createFeatureSelector<IOrdersStore>(ordersFeatureName);
export const selectOrders = createSelector(selectOrdersFeature, state => state.orders);
export const selectOrdersList = createSelector(selectOrders, state => state && state.orders);
