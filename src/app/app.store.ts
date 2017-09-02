import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

import { LoadingEffects } from './state/effects/loading.effects';

const metaReducers = environment.production ?
    [] :
    [ storeFreeze ];

// tslint:disable-next-line no-empty-interface
export interface IAppStore {
}

export const initialAppState: IAppStore = {
};

export const appReducers: ActionReducerMap<IAppStore> = {
};

export const appEffects = [
    LoadingEffects,
];

export const storeOptions = {
    initialState: initialAppState,
    metaReducers: metaReducers,
};

