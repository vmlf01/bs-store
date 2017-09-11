import { Action } from '@ngrx/store';
import { IOrder } from '../../../../interfaces/IOrder';
import { AppError } from '../../../../interfaces/AppError';


export const SHOW_ORDERS_MANAGEMENT = 'SHOW_ORDERS_MANAGEMENT';
export const SHOW_ORDER_DETAILS_MANAGEMENT = 'SHOW_ORDER_DETAILS_MANAGEMENT';

export const LOAD_ORDERS_LIST = 'LOAD_ORDERS_LIST';
export const LOAD_ORDERS_LIST_SUCCESS = 'LOAD_ORDERS_LIST_SUCCESS';
export const LOAD_ORDERS_LIST_FAILURE = 'LOAD_ORDERS_LIST_FAILURE';

export const DELETE_EXISTING_ORDER = 'DELETE_EXISTING_ORDER';
export const DELETE_EXISTING_ORDER_SUCCESS = 'DELETE_EXISTING_ORDER_SUCCESS';
export const DELETE_EXISTING_ORDER_FAILURE = 'DELETE_EXISTING_ORDER_FAILURE';
export const CANCEL_DELETE_EXISTING_ORDER = 'CANCEL_DELETE_EXISTING_ORDER';

export class ShowOrdersManagement implements Action {
    readonly type = SHOW_ORDERS_MANAGEMENT;
}

export class ShowOrderDetailsManagement implements Action {
    readonly type = SHOW_ORDER_DETAILS_MANAGEMENT;
    constructor(public readonly payload: IOrder) {}
}

export class LoadOrdersList implements Action {
    readonly type = LOAD_ORDERS_LIST;
}

export class LoadOrdersListSuccess implements Action {
    readonly type = LOAD_ORDERS_LIST_SUCCESS;
    constructor(public readonly payload: { orders: IOrder[] }) {}
}

export class LoadOrdersListFailure implements Action {
    readonly type = LOAD_ORDERS_LIST_FAILURE;
    constructor(public readonly payload: AppError ) {}
}

export class DeleteExistingOrder implements Action {
    readonly type = DELETE_EXISTING_ORDER;
    constructor(public readonly payload: IOrder) {}
}

export class CancelDeleteExistingOrder implements Action {
    readonly type = CANCEL_DELETE_EXISTING_ORDER;
}

export class DeleteExistingOrderSuccess implements Action {
    readonly type = DELETE_EXISTING_ORDER_SUCCESS;
}

export class DeleteExistingOrderFailure implements Action {
    readonly type = DELETE_EXISTING_ORDER_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export type OrdersListActions =
    ShowOrdersManagement
    | ShowOrderDetailsManagement
    | LoadOrdersList
    | LoadOrdersListSuccess
    | LoadOrdersListFailure
    | DeleteExistingOrder
    | DeleteExistingOrderSuccess
    | DeleteExistingOrderFailure
    | CancelDeleteExistingOrder
;
