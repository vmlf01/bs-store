import { Action } from '@ngrx/store';
import { IProduct } from '../../../../interfaces/IProduct';

export const LOAD_PRODUCTS_LIST = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_LIST_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';

export class LoadProductsList implements Action {
    readonly type = LOAD_PRODUCTS_LIST;
    readonly payload: number;

    constructor(pageNumber: number) {
        this.payload = pageNumber;
    }
}

export class LoadProductsListSuccess implements Action {
    readonly type = LOAD_PRODUCTS_LIST_SUCCESS;
    constructor(public readonly payload: { products: IProduct[], totalCount: number }) {}
}

export type ProductsListActions =
    LoadProductsList
    | LoadProductsListSuccess
;
