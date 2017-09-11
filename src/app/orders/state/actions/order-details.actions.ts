import { Action } from '@ngrx/store';
import { IOrder } from '../../../../interfaces/IOrder';
import { AppError } from '../../../../interfaces/AppError';

export const LOAD_ORDER_DETAILS_MANAGEMENT = 'LOAD_ORDER_DETAILS_MANAGEMENT';
export const LOAD_ORDER_DETAILS_MANAGEMENT_SUCCESS = 'LOAD_ORDER_DETAILS_MANAGEMENT_SUCCESS';
export const LOAD_ORDER_DETAILS_MANAGEMENT_FAILURE = 'LOAD_ORDER_DETAILS_MANAGEMENT_FAILURE';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_FAILURE = 'UPDATE_ORDER_STATUS_FAILURE';

export class LoadOrderDetailsManagement implements Action {
    readonly type = LOAD_ORDER_DETAILS_MANAGEMENT;
    constructor(public readonly payload: IOrder) {}
}

export class LoadOrderDetailsManagementSuccess implements Action {
    readonly type = LOAD_ORDER_DETAILS_MANAGEMENT_SUCCESS;
    constructor(public readonly payload: IOrder) {}
}

export class LoadOrderDetailsManagementFailure implements Action {
    readonly type = LOAD_ORDER_DETAILS_MANAGEMENT_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export class UpdateOrderStatus implements Action {
    readonly type = UPDATE_ORDER_STATUS;
    constructor(public readonly payload: IOrder) {}
}

export class UpdateOrderStatusSuccess implements Action {
    readonly type = UPDATE_ORDER_STATUS_SUCCESS;
}

export class UpdateOrderStatusFailure implements Action {
    readonly type = UPDATE_ORDER_STATUS_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export type OrderDetailsActions =
    LoadOrderDetailsManagement
    | LoadOrderDetailsManagementSuccess
    | LoadOrderDetailsManagementFailure
    | UpdateOrderStatus
    | UpdateOrderStatusSuccess
    | UpdateOrderStatusFailure
;
