import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as LoginActionTypes from '../../login/state/actions/login.actions';
import * as AppActionTypes from '../actions/app.actions';
import { AppActions, GoToHome, SetUserMenuOptions, UserMenuOptionSelected, GoToProductsManagement } from '../actions/app.actions';
import { LoginSuccess, SignupSuccess, Logout } from '../../login/state/actions/login.actions';
import { IUserProfile } from '../../../interfaces/IUserProfile';
import { IMenuOption, UserMenuOptions } from '../../../interfaces/IMenuOption';

const AppMenuOptions = {
    'BUYER': [
        { id: UserMenuOptions.MyProfile, label: 'My profile' },
        { id: UserMenuOptions.MyOrders, label: 'My orders' },
        { id: UserMenuOptions.Logout, label: 'Log out' },
    ],
    'ADMIN': [
        { id: UserMenuOptions.MyProfile, label: 'My profile' },
        { id: UserMenuOptions.Products, label: 'Products' },
        { id: UserMenuOptions.Orders, label: 'Orders' },
        { id: UserMenuOptions.Users, label: 'Users' },
        { id: UserMenuOptions.Logout, label: 'Log out' },
    ],
    'MANAGER': [
        { id: UserMenuOptions.MyProfile, label: 'My profile' },
        { id: UserMenuOptions.Products, label: 'Products' },
        { id: UserMenuOptions.Orders, label: 'Orders' },
        { id: UserMenuOptions.Logout, label: 'Log out' },
    ],
};

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
            LoginActionTypes.SET_USER_AUTHENTICATION,
        )
        .map(action => action.payload)
        .map((user: IUserProfile) => {
            const menuOptions = AppMenuOptions[user.role] || [];
            return new SetUserMenuOptions({ options: menuOptions });
        });

    @Effect() selectMenuOption$ = this.actions$
        .ofType<UserMenuOptionSelected>(AppActionTypes.USER_MENU_OPTION_SELECTED)
        .map(action => {
            switch (action.payload.id) {
                case UserMenuOptions.Logout:
                    return new Logout();

                case UserMenuOptions.Products:
                    return new GoToProductsManagement();

                default:
                    return new GoToHome();
            }
        });
}
