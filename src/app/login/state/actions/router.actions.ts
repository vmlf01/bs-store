import { Action } from '@ngrx/store';

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const SHOW_SIGNUP = 'SHOW_SIGNUP';

export class ShowLogin implements Action {
    readonly type = SHOW_LOGIN;
}

export class ShowSignup implements Action {
    readonly type = SHOW_SIGNUP;
}

export type LoginRouterActions =
    ShowLogin
    | ShowSignup
;
