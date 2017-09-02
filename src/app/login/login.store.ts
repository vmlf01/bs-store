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

export const selectLogin = createFeatureSelector<ILoginStore>(LoginFeatureName);
export const selectUserProfile = createSelector(selectLogin, (state: ILoginStore) => state.login.profile);
export const selectIsAuthenticating = createSelector(selectLogin, (state: ILoginStore) => state.login.isAuthenticating);
export const selectIsAuthenticated = createSelector(selectLogin, (state: ILoginStore) => state.login.isAuthenticated);
