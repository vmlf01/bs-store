import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import { UserDetailsActions } from '../actions/user-details.actions';
import * as ActionTypes from '../actions/user-details.actions';
import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { AppError } from '../../../../interfaces/AppError';

export interface IUserDetailsState {
    user: IUserProfile;
    isNew: boolean;
    isSaved: boolean;
    isReadOnly: boolean;
    error: AppError;
}

export const initialUserDetailsState: IUserDetailsState = {
    user: null,
    isNew: true,
    isSaved: false,
    isReadOnly: true,
    error: null,
};

export function userDetailsReducer(state: IUserDetailsState = initialUserDetailsState, action: UserDetailsActions): IUserDetailsState {
    switch (action.type) {
        case ActionTypes.ADD_NEW_USER:
            return {
                ...state,
                user: null,
                isNew: true,
                isReadOnly: false,
                error: null
            };

        case ActionTypes.EDIT_EXISTING_USER:
            return {
                ...state,
                user: null,
                isNew: false,
                isReadOnly: false,
                error: null,
            };

        case ActionTypes.SHOW_EXISTING_USER:
            return {
                ...state,
                user: null,
                isNew: false,
                isReadOnly: true,
                error: null,
            };

        case ActionTypes.OPEN_USER_DETAILS_MODAL:
        case ActionTypes.SAVE_USER_DETAILS:
            return {
                ...state,
                isSaved: false,
                error: null,
                user: action.payload,
            };

        case ActionTypes.USER_SAVE_SUCCESS:
            return {
                ...state,
                isSaved: true,
            };

        case ActionTypes.CLOSE_USER_DETAILS_MODAL:
        case ActionTypes.CANCEL_USER_DETAILS_MODAL:
        case ActionTypes.DELETE_EXISTING_USER_SUCCESS:
            return {
                    ...state,
                    user: null,
                    error: null,
                };

        case ActionTypes.OPEN_USER_DETAILS_MODAL_FAILURE:
        case ActionTypes.USER_SAVE_FAILURE:
        case ActionTypes.DELETE_EXISTING_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
}
