import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

import { LoadingEffects } from './state/effects/loading.effects';
import { IAppState, AppReducer, initialAppState } from './state/reducers/app.reducer';
import { AppEffects } from './state/effects/app.effects';
import { AppRouterEffects } from './state/effects/router.effects';
import { RouterStateUrl } from './utils';

const metaReducers = environment.production ?
    [] :
    [ storeFreeze ];

export interface IAppStore {
    app: IAppState;
    routerReducer: RouterReducerState<RouterStateUrl>;
}

export const initialAppStoreState: IAppStore = {
    app: initialAppState,
    routerReducer: null,
};

export const appReducers: ActionReducerMap<IAppStore> = {
    app: AppReducer,
    routerReducer: routerReducer,
};

export const appEffects = [
    LoadingEffects,
    AppEffects,
    AppRouterEffects,
];

export const storeOptions = {
    initialState: initialAppStoreState,
    metaReducers: metaReducers,
};

