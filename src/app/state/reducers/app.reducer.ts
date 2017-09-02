import { IAppStore } from '../../app.store';
import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import * as ActionTypes from '../actions/app.actions';
import { IMenuOption } from '../../../interfaces/IMenuOption';

export interface IAppState {
    isAdminPage: boolean;
    userMenuOptions: IMenuOption[];
}

export const initialAppState: IAppState = {
    isAdminPage: false,
    userMenuOptions: [],
};

export function AppReducer(state: IAppState = initialAppState, action): IAppState {
    switch (action.type) {
        case ActionTypes.ADMIN_PAGE_LOADED:
            return {
                ...state,
                isAdminPage: true,
            };

        case ActionTypes.SHOP_PAGE_LOADED:
            return {
                ...state,
                isAdminPage: false,
            };

        case ActionTypes.SET_USER_MENU_OPTIONS:
            return {
                ...state,
                userMenuOptions: action.payload.options,
            };

        default:
            return state;
    }
}

export const selectAppState = (state: IAppStore) => state.app;
export const selectMenuOptions = createSelector(selectAppState, (state: IAppState) => state.userMenuOptions);
