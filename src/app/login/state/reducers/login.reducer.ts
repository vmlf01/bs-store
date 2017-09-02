import { Action, ActionReducer, createFeatureSelector } from '@ngrx/store';

import * as ActionTypes from '../actions/login.actions';
import { LoginActions } from '../actions/login.actions';
import { IOrderItem } from '../../../../interfaces/IOrderItem';
import { IUserProfile } from '../../../../interfaces/IUserProfile';

export interface ILoginState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    profile: IUserProfile;
}

export const initialLoginState: ILoginState = {
    isAuthenticated: false,
    isAuthenticating: false,
    profile: null,
};

export function loginReducer(state: ILoginState = initialLoginState, action: LoginActions): ILoginState {
    switch (action.type) {
        case ActionTypes.LOGIN:
        case ActionTypes.SIGNUP:
            return {
                ...state,
                isAuthenticating: true,
            };

        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                profile: action.payload,
            };

        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                profile: null,
            };

        default:
            return state;
    }
}
