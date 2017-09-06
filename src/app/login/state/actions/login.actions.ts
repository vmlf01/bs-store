import { Action } from '@ngrx/store';
import { ILogin } from '../../../../interfaces/ILogin';
import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { AppError } from '../../../../interfaces/AppError';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const USER_AUTHENTICATION_NEEDED = 'USER_AUTHENTICATION_NEEDED';
export const USER_NOT_AUTHORIZED = 'USER_NOT_AUTHORIZED';
export const SET_USER_AUTHENTICATION = 'SET_USER_AUTHENTICATION';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public readonly payload: ILogin) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public readonly payload: IUserProfile) {}
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export class Signup implements Action {
    readonly type = SIGNUP;
    constructor(public readonly payload: ILogin) {}
}

export class SignupSuccess implements Action {
    readonly type = SIGNUP_SUCCESS;
    constructor(public readonly payload: IUserProfile) {}
}

export class SignupFailure implements Action {
    readonly type = SIGNUP_FAILURE;
    constructor(public readonly payload: AppError) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
}

export class UserAuthenticationNeeded implements Action {
    readonly type = USER_AUTHENTICATION_NEEDED;
    constructor(public readonly payload: string) {}
}

export class UserNotAuthorized implements Action {
    readonly type = USER_NOT_AUTHORIZED;
    constructor(public readonly payload: string) {}
}

export class SetUserAuthentication implements Action {
    readonly type = SET_USER_AUTHENTICATION;
    constructor(public readonly payload: IUserProfile) {}
}

export type LoginActions =
    Login
    | LoginSuccess
    | LoginFailure
    | Signup
    | SignupSuccess
    | SignupFailure
    | Logout
    | LogoutSuccess
    | UserAuthenticationNeeded
    | UserNotAuthorized
    | SetUserAuthentication
;
