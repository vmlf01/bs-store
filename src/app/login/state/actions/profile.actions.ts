import { Action } from '@ngrx/store';

import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { AppError } from '../../../../interfaces/AppError';

export const SAVE_USER_PROFILE = 'SAVE_USER_PROFILE';
export const SAVE_USER_PROFILE_SUCCESS = 'SAVE_USER_PROFILE_SUCCESS';
export const SAVE_USER_PROFILE_FAILURE = 'SAVE_USER_PROFILE_FAILURE';
export const RELOAD_USER_PROFILE = 'RELOAD_USER_PROFILE';

export class SaveUserProfile implements Action {
    readonly type = SAVE_USER_PROFILE;

    constructor(public readonly payload: IUserProfile) {}
}

export class SaveUserProfileSuccess implements Action {
    readonly type = SAVE_USER_PROFILE_SUCCESS;
}

export class SaveUserProfileFailure implements Action {
    readonly type = SAVE_USER_PROFILE_FAILURE;

    constructor(public readonly payload: AppError) {}
}

export class ReloadUserProfile implements Action {
    readonly type = RELOAD_USER_PROFILE;
}

export type ProfileActions =
    SaveUserProfile
    | SaveUserProfileSuccess
    | SaveUserProfileFailure
    | ReloadUserProfile
;
