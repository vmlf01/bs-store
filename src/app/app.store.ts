import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';

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
];

export const storeOptions = {
    initialState: initialAppState,
    metaReducers: metaReducers,
};

