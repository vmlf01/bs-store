import { Action, ActionReducer, createFeatureSelector } from '@ngrx/store';

import * as ActionTypes from '../actions/profile.actions';
import { ProfileActions } from '../actions/profile.actions';
import { AppError } from '../../../../interfaces/AppError';

export interface IProfileState {
    error?: AppError;
}

export const initialProfileState: IProfileState = {
    error: null
};

export function profileReducer(state: IProfileState = initialProfileState, action: ProfileActions): IProfileState {
    switch (action.type) {
        case ActionTypes.SAVE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
            };

        case ActionTypes.SAVE_USER_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
    }
}
