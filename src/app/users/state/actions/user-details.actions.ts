import { Action } from '@ngrx/store';
import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { AppError } from '../../../../interfaces/AppError';

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const EDIT_EXISTING_USER = 'EDIT_EXISTING_USER';
export const SHOW_EXISTING_USER = 'SHOW_EXISTING_USER';
export const OPEN_USER_DETAILS_MODAL = 'OPEN_USER_DETAILS_MODAL';
export const OPEN_USER_DETAILS_MODAL_FAILURE = 'OPEN_USER_DETAILS_MODAL_FAILURE';
export const CLOSE_USER_DETAILS_MODAL = 'CLOSE_USER_DETAILS_MODAL';
export const CANCEL_USER_DETAILS_MODAL = 'CANCEL_USER_DETAILS_MODAL';
export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS';
export const USER_SAVE_FAILURE = 'USER_SAVE_FAILURE';
export const DELETE_EXISTING_USER = 'DELETE_EXISTING_USER';
export const DELETE_EXISTING_USER_SUCCESS = 'DELETE_EXISTING_USER_SUCCESS';
export const DELETE_EXISTING_USER_FAILURE = 'DELETE_EXISTING_USER_FAILURE';
export const CANCEL_DELETE_EXISTING_USER = 'CANCEL_DELETE_EXISTING_USER';

export class AddNewUser implements Action {
    readonly type = ADD_NEW_USER;
}

export class EditExistingUser implements Action {
    readonly type = EDIT_EXISTING_USER;
    constructor(public readonly payload: string) {}
}

export class ShowExistingUser implements Action {
    readonly type = SHOW_EXISTING_USER;
    constructor(public readonly payload: string) {}
}

export class OpenUserDetailsModal implements Action {
    readonly type = OPEN_USER_DETAILS_MODAL;
    constructor(public readonly payload: IUserProfile) {}
}

export class OpenUserDetailsModalFailure implements Action {
    readonly type = OPEN_USER_DETAILS_MODAL_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export class CloseUserDetailsModal implements Action {
    readonly type = CLOSE_USER_DETAILS_MODAL;
}

export class CancelUserDetailsModal implements Action {
    readonly type = CANCEL_USER_DETAILS_MODAL;
}

export class SaveUserDetails implements Action {
    readonly type = SAVE_USER_DETAILS;
    constructor(public readonly payload: IUserProfile) {}
}

export class UserSaveSuccess implements Action {
    readonly type = USER_SAVE_SUCCESS;
    constructor(public readonly payload: string) {}
}

export class UserSaveFailure implements Action {
    readonly type = USER_SAVE_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export class DeleteExistingUser implements Action {
    readonly type = DELETE_EXISTING_USER;
    constructor(public readonly payload: string) {}
}

export class CancelDeleteExistingUser implements Action {
    readonly type = CANCEL_DELETE_EXISTING_USER;
}

export class DeleteExistingUserSuccess implements Action {
    readonly type = DELETE_EXISTING_USER_SUCCESS;
}

export class DeleteExistingUserFailure implements Action {
    readonly type = DELETE_EXISTING_USER_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export type UserDetailsActions =
    AddNewUser
    | EditExistingUser
    | ShowExistingUser
    | OpenUserDetailsModal
    | OpenUserDetailsModalFailure
    | CloseUserDetailsModal
    | CancelUserDetailsModal
    | SaveUserDetails
    | UserSaveSuccess
    | UserSaveFailure
    | DeleteExistingUser
    | CancelDeleteExistingUser
    | DeleteExistingUserSuccess
    | DeleteExistingUserFailure
;
