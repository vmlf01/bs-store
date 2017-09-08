import { Action } from '@ngrx/store';
import { AppError } from '../../../../interfaces/AppError';
import { IUserProfile } from '../../../../interfaces/IUserProfile';

export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const LOAD_USERS_LIST_SUCCESS = 'LOAD_USERS_LIST_SUCCESS';
export const LOAD_USERS_LIST_FAILURE = 'LOAD_USERS_LIST_FAILURE';

export class LoadUsersList implements Action {
    readonly type = LOAD_USERS_LIST;
    readonly payload: string;

    constructor(startingLetter: string) {
        this.payload = startingLetter;
    }
}

export class LoadUsersListSuccess implements Action {
    readonly type = LOAD_USERS_LIST_SUCCESS;
    constructor(public readonly payload: { users: IUserProfile[] }) {}
}

export class LoadUsersListFailure implements Action {
    readonly type = LOAD_USERS_LIST_FAILURE;
    constructor(public readonly payload: AppError ) {}
}

export type UsersListActions =
    LoadUsersList
    | LoadUsersListSuccess
    | LoadUsersListFailure
;
