import { Action } from '@ngrx/store';
import { IProduct } from '../../../../interfaces/IProduct';
import { AppError } from '../../../../interfaces/AppError';

export const LOAD_PRODUCTS_LIST = 'LOAD_PRODUCTS_LIST';
export const LOAD_PRODUCTS_LIST_SUCCESS = 'LOAD_PRODUCTS_LIST_SUCCESS';
export const LOAD_PRODUCTS_LIST_FAILURE = 'LOAD_PRODUCTS_LIST_FAILURE';

export class LoadProductsList implements Action {
    readonly type = LOAD_PRODUCTS_LIST;
    readonly payload: string;

    constructor(startingLetter: string) {
        this.payload = startingLetter;
    }
}

export class LoadProductsListSuccess implements Action {
    readonly type = LOAD_PRODUCTS_LIST_SUCCESS;
    constructor(public readonly payload: { products: IProduct[] }) {}
}

export class LoadProductsListFailure implements Action {
    readonly type = LOAD_PRODUCTS_LIST_FAILURE;
    constructor(public readonly payload: AppError ) {}
}

export type ProductsListActions =
    LoadProductsList
    | LoadProductsListSuccess
    | LoadProductsListFailure
;
