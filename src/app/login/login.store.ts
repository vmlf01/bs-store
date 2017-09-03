import { IUserProfile } from '../../interfaces/IUserProfile';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { initialLoginState, ILoginState, loginReducer } from './state/reducers/login.reducer';

export interface ILoginStore {
    login: ILoginState;
}

export const initialLoginStoreState: ILoginStore = {
    login: initialLoginState,
};

export const LoginReducers: ActionReducerMap<ILoginStore> = {
    login: loginReducer,
};

export const LoginFeatureName = 'Login';

export const selectLoginFeature = createFeatureSelector<ILoginStore>(LoginFeatureName);
export const selectLogin = createSelector(selectLoginFeature, state => state.login);
export const selectUserProfile = createSelector(selectLogin, state => state.profile);
export const selectIsAuthenticating = createSelector(selectLogin, state => state.isAuthenticating);
export const selectIsAuthenticated = createSelector(selectLogin, state => state.isAuthenticated);
export const selectAuthError = createSelector(selectLogin, state => state.error);
