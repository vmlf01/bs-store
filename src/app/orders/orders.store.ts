import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { IOrder } from '../../interfaces/IOrder';
import { initialOrdersListState, IOrdersListState, ordersListReducer } from './state/reducers/orders-list.reducer';
import { IOrderDetailsState, initialOrderDetailsState, orderDetailsReducer } from './state/reducers/order-details.reducer';

export interface IOrdersStore {
    orders: IOrdersListState;
    orderDetails: IOrderDetailsState;
}

export const initialState: IOrdersStore = {
    orders: initialOrdersListState,
    orderDetails: initialOrderDetailsState,
};

export const reducers: ActionReducerMap<IOrdersStore> = {
    orders: ordersListReducer,
    orderDetails: orderDetailsReducer,
};

export const ordersFeatureName = 'orders';

export const selectOrdersFeature = createFeatureSelector<IOrdersStore>(ordersFeatureName);
export const selectOrders = createSelector(selectOrdersFeature, state => state.orders);
export const selectOrdersList = createSelector(selectOrders, state => state && state.orders);
export const selectOrderDetails = createSelector(selectOrdersFeature, state => state && state.orderDetails);
