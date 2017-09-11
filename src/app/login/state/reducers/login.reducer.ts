import { Action, ActionReducer, createFeatureSelector } from '@ngrx/store';

import * as ActionTypes from '../actions/login.actions';
import { LoginActions } from '../actions/login.actions';
import { IOrderItem } from '../../../../interfaces/IOrderItem';
import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { AppError } from '../../../../interfaces/AppError';

export interface ILoginState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error?: AppError;
    profile: IUserProfile;
    redirectUrl?: string;
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
                error: null,
            };

        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                error: null,
            };

        case ActionTypes.SET_USER_AUTHENTICATION:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: !!action.payload,
                profile: action.payload,
            };

        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                error: action.payload,
                profile: null,
            };

        case ActionTypes.LOGOUT_SUCCESS:
            return { ...initialLoginState };

        case ActionTypes.USER_AUTHENTICATION_NEEDED:
            return {
                ...state,
                redirectUrl: action.payload,
            };

        case ActionTypes.CLEAR_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: '',
            };

        default:
            return state;
    }
}
