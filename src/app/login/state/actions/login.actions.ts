import { Action } from '@ngrx/store';
import { ILogin } from '../../../../interfaces/ILogin';
import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { AppError } from '../../../../interfaces/AppError';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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

export type LoginActions =
    Login
    | LoginSuccess
    | LoginFailure
    | Signup
    | SignupSuccess
    | SignupFailure
    | Logout
    | LogoutSuccess
;
