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

export const selectLogin = createFeatureSelector(LoginFeatureName);
export const selectUserProfile = createSelector(selectLogin, (state: ILoginState) => state.profile);
export const selectIsAuthenticating = createSelector(selectLogin, (state: ILoginState) => state.isAuthenticating);
export const selectIsAuthenticated = createSelector(selectLogin, (state: ILoginState) => state.isAuthenticated);
