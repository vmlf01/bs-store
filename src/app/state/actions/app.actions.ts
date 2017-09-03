import { Action } from '@ngrx/store';
import { IMenuOption, UserMenuOptions } from '../../../interfaces/IMenuOption';

export const ADMIN_PAGE_LOADED = 'ADMIN_PAGE_LOADED';
export const SHOP_PAGE_LOADED = 'SHOP_PAGE_LOADED';
export const SET_USER_MENU_OPTIONS = 'SET_USER_MENU_OPTIONS';
export const GO_TO_HOME = 'GO_TO_HOME';
export const USER_MENU_OPTION_SELECTED = 'USER_MENU_OPTION_SELECTED';
export const GO_TO_PRODUCTS_MANAGEMENT = 'GO_TO_PRODUCTS_MANAGEMENT';

export class AdminPageLoaded implements Action {
    readonly type = ADMIN_PAGE_LOADED;
}

export class ShopPageLoaded implements Action {
    readonly type = SHOP_PAGE_LOADED;
}

export class SetUserMenuOptions implements Action {
    readonly type = SET_USER_MENU_OPTIONS;
    constructor(public readonly payload: { options: IMenuOption[] }) {}
}

export class GoToHome implements Action {
    readonly type = GO_TO_HOME;
}

export class UserMenuOptionSelected implements Action {
    readonly type = USER_MENU_OPTION_SELECTED;
    constructor(public readonly payload: IMenuOption) {}
}

export class GoToProductsManagement implements Action {
    readonly type = GO_TO_PRODUCTS_MANAGEMENT;
}

export type AppActions =
    AdminPageLoaded
    | ShopPageLoaded
    | SetUserMenuOptions
    | GoToHome
    | UserMenuOptionSelected
    | GoToProductsManagement
;
