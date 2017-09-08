import { Action, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';

import { UsersListActions } from '../actions/users-list.actions';
import * as ActionTypes from '../actions/users-list.actions';
import { AppError } from '../../../../interfaces/AppError';
import { IUserProfile, UserRoles } from '../../../../interfaces/IUserProfile';

export interface IUsersListState {
    users: IUserProfile[];
    roles: UserRoles[];
    isLoading: boolean;
    currentInitial: string;
    error: AppError;
}

export const initialUsersListState: IUsersListState = {
    users: [],
    roles: ['BUYER', 'MANAGER', 'ADMIN'],
    isLoading: false,
    currentInitial: 'a',
    error: null,
};

export function usersListReducer(state: IUsersListState = initialUsersListState, action: UsersListActions): IUsersListState {
    switch (action.type) {
        case ActionTypes.LOAD_USERS_LIST:
            return {
                ...state,
                isLoading: true,
                currentInitial: action.payload,
            };

        case ActionTypes.LOAD_USERS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload.users,
            };

        case ActionTypes.LOAD_USERS_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                users: [],
                error: action.payload,
            };

        default:
            return state;
    }
}
