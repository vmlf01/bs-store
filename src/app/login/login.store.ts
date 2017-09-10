import { IUserProfile } from '../../interfaces/IUserProfile';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { initialLoginState, ILoginState, loginReducer } from './state/reducers/login.reducer';
import { IProfileState, initialProfileState, profileReducer } from './state/reducers/profile.reducer';

export interface ILoginStore {
    login: ILoginState;
    profile: IProfileState;
}

export const initialLoginStoreState: ILoginStore = {
    login: initialLoginState,
    profile: initialProfileState,
};

export const LoginReducers: ActionReducerMap<ILoginStore> = {
    login: loginReducer,
    profile: profileReducer,
};

export const LoginFeatureName = 'Login';

export const selectLoginFeature = createFeatureSelector<ILoginStore>(LoginFeatureName);
export const selectLogin = createSelector(selectLoginFeature, state => state && state.login);
export const selectUserProfile = createSelector(selectLogin, state => state && state.profile);
export const selectIsAuthenticating = createSelector(selectLogin, state => state.isAuthenticating);
export const selectIsAuthenticated = createSelector(selectLogin, state => state.isAuthenticated);
export const selectAuthError = createSelector(selectLogin, state => state.error);
export const selectAuthRedirect = createSelector(selectLogin, state => state && state.redirectUrl);
export const selectProfileEdit = createSelector(selectLoginFeature, state => state && state.profile);
export const selectProfileError = createSelector(selectProfileEdit, state => state && state.error);
