import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { initialUsersListState, IUsersListState, usersListReducer } from './state/reducers/users-list.reducer';
import { IUserDetailsState, initialUserDetailsState, userDetailsReducer } from './state/reducers/user-details.reducer';

export interface IUsersStore {
    users: IUsersListState;
    userDetails: IUserDetailsState;
}

export const initialState: IUsersStore = {
    users: initialUsersListState,
    userDetails: initialUserDetailsState,
};

export const reducers: ActionReducerMap<IUsersStore> = {
    users: usersListReducer,
    userDetails: userDetailsReducer,
};

export const usersFeatureName = 'users';

export const selectUsersFeature = createFeatureSelector<IUsersStore>(usersFeatureName);
export const selectUsers = createSelector(selectUsersFeature, state => state.users);
export const selectUsersList = createSelector(selectUsers, state => state && state.users);
export const selectRoles = createSelector(selectUsers, state => state && state.roles);
export const selectUserDetails = createSelector(selectUsersFeature, state => state && state.userDetails);
