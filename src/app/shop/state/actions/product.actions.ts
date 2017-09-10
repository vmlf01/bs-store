import { Action } from '@ngrx/store';
import { IProduct } from '../../../../interfaces/IProduct';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCT_DETAILS = 'LOAD_PRODUCT_DETAILS';
export const LOAD_PRODUCT_DETAILS_SUCCESS = 'LOAD_PRODUCT_DETAILS_SUCCESS';

export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS;
    readonly payload: boolean;

    constructor(resetList: boolean) {
        this.payload = resetList;
    }
}

export class LoadProductsSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS;
    constructor(public readonly payload: { products: IProduct[], nextPage: string }) {}
}

export class LoadProductDetails implements Action {
    readonly type = LOAD_PRODUCT_DETAILS;
    constructor(public readonly payload: string) {}
}

export class LoadProductDetailsSuccess implements Action {
    readonly type = LOAD_PRODUCT_DETAILS_SUCCESS;
    constructor(public readonly payload: IProduct) {}
}

export type ProductActions =
    LoadProducts
    | LoadProductsSuccess
    | LoadProductDetails
    | LoadProductDetailsSuccess
;
