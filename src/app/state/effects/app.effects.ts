import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as LoginActionTypes from '../../login/state/actions/login.actions';
import { SetUserMenuOptions } from '../actions/app.actions';
import { LoginSuccess, SignupSuccess } from '../../login/state/actions/login.actions';
import { IUserProfile } from '../../../interfaces/IUserProfile';
import { IMenuOption, UserMenuOptions } from '../../../interfaces/IMenuOption';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
    ) {
    }

    @Effect() setUserOptions$ = this.actions$
        .ofType<LoginSuccess | SignupSuccess>(
            LoginActionTypes.LOGIN_SUCCESS,
            LoginActionTypes.SIGNUP_SUCCESS,
        )
        .map(action => action.payload)
        .map((user: IUserProfile) => {
            const menuOptions: IMenuOption[] = [];

            menuOptions.push({ id: UserMenuOptions.Profile, label: 'My profile' });
            menuOptions.push({ id: UserMenuOptions.Logout, label: 'Log out' });

            return new SetUserMenuOptions({ options: menuOptions });
        });
}
