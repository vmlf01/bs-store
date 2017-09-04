import { Action } from '@ngrx/store';
import { IProduct } from '../../../../interfaces/IProduct';
import { AppError } from '../../../../interfaces/AppError';

export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const EDIT_EXISTING_PRODUCT = 'EDIT_EXISTING_PRODUCT';
export const OPEN_PRODUCT_DETAILS_MODAL = 'OPEN_PRODUCT_DETAILS_MODAL';
export const OPEN_PRODUCT_DETAILS_MODAL_FAILURE = 'OPEN_PRODUCT_DETAILS_MODAL_FAILURE';
export const CLOSE_PRODUCT_DETAILS_MODAL = 'CLOSE_PRODUCT_DETAILS_MODAL';
export const CANCEL_PRODUCT_DETAILS_MODAL = 'CANCEL_PRODUCT_DETAILS_MODAL';
export const SAVE_PRODUCT_DETAILS = 'SAVE_PRODUCT_DETAILS';
export const PRODUCT_SAVE_SUCCESS = 'PRODUCT_SAVE_SUCCESS';
export const PRODUCT_SAVE_FAILURE = 'PRODUCT_SAVE_FAILURE';
export const DELETE_EXISTING_PRODUCT = 'DELETE_EXISTING_PRODUCT';
export const DELETE_EXISTING_PRODUCT_SUCCESS = 'DELETE_EXISTING_PRODUCT_SUCCESS';
export const DELETE_EXISTING_PRODUCT_FAILURE = 'DELETE_EXISTING_PRODUCT_FAILURE';
export const CANCEL_DELETE_EXISTING_PRODUCT = 'CANCEL_DELETE_EXISTING_PRODUCT';

export class AddNewProduct implements Action {
    readonly type = ADD_NEW_PRODUCT;
}

export class EditExistingProduct implements Action {
    readonly type = EDIT_EXISTING_PRODUCT;
    constructor(public readonly payload: string) {}
}

export class OpenProductDetailsModal implements Action {
    readonly type = OPEN_PRODUCT_DETAILS_MODAL;
    constructor(public readonly payload: IProduct) {}
}

export class OpenProductDetailsModalFailure implements Action {
    readonly type = OPEN_PRODUCT_DETAILS_MODAL_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export class CloseProductDetailsModal implements Action {
    readonly type = CLOSE_PRODUCT_DETAILS_MODAL;
}

export class CancelProductDetailsModal implements Action {
    readonly type = CANCEL_PRODUCT_DETAILS_MODAL;
}

export class SaveProductDetails implements Action {
    readonly type = SAVE_PRODUCT_DETAILS;
    constructor(public readonly payload: IProduct) {}
}

export class ProductSaveSuccess implements Action {
    readonly type = PRODUCT_SAVE_SUCCESS;
    constructor(public readonly payload: string) {}
}

export class ProductSaveFailure implements Action {
    readonly type = PRODUCT_SAVE_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export class DeleteExistingProduct implements Action {
    readonly type = DELETE_EXISTING_PRODUCT;
    constructor(public readonly payload: string) {}
}

export class CancelDeleteExistingProduct implements Action {
    readonly type = CANCEL_DELETE_EXISTING_PRODUCT;
}

export class DeleteExistingProductSuccess implements Action {
    readonly type = DELETE_EXISTING_PRODUCT_SUCCESS;
}

export class DeleteExistingProductFailure implements Action {
    readonly type = DELETE_EXISTING_PRODUCT_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export type ProductDetailsActions =
    AddNewProduct
    | EditExistingProduct
    | OpenProductDetailsModal
    | OpenProductDetailsModalFailure
    | CloseProductDetailsModal
    | CancelProductDetailsModal
    | SaveProductDetails
    | ProductSaveSuccess
    | ProductSaveFailure
    | DeleteExistingProduct
    | CancelDeleteExistingProduct
    | DeleteExistingProductSuccess
    | DeleteExistingProductFailure
;
