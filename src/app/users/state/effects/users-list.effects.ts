import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as ActionTypes from '../actions/users-list.actions';
import { LoadUsersListSuccess, LoadUsersList, LoadUsersListFailure } from '../actions/users-list.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UsersListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private usersService: UsersService
    ) {
    }

    @Effect() loadUsers$ = this.actions$
        .ofType<LoadUsersList>(ActionTypes.LOAD_USERS_LIST)
        .switchMap(action => {
            return this.usersService.getUsers(action.payload)
                .map(users => new LoadUsersListSuccess({ users }))
                .catch(error => Observable.of(new LoadUsersListFailure(error.message)));
        });
}

