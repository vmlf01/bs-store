import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

import { LoadingEffects } from './state/effects/loading.effects';
import { IAppState, AppReducer, initialAppState } from './state/reducers/app.reducer';
import { AppEffects } from './state/effects/app.effects';

const metaReducers = environment.production ?
    [] :
    [ storeFreeze ];

// tslint:disable-next-line no-empty-interface
export interface IAppStore {
    app: IAppState;
}

export const initialAppStoreState: IAppStore = {
    app: initialAppState,
};

export const appReducers: ActionReducerMap<IAppStore> = {
    app: AppReducer,
};

export const appEffects = [
    LoadingEffects,
    AppEffects,
];

export const storeOptions = {
    initialState: initialAppStoreState,
    metaReducers: metaReducers,
};

