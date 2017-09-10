import { BsAlertService } from '../../../shared/bs-alert.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UsersService } from '../../../shared/users.service';
import { SaveUserProfile, SaveUserProfileFailure, SaveUserProfileSuccess } from '../actions/profile.actions';
import * as ActionTypes from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private usersService: UsersService,
        private bsAlert: BsAlertService,
    ) {
    }

    @Effect() updateProfile$ = this.actions$
        .ofType<SaveUserProfile>(ActionTypes.SAVE_USER_PROFILE)
        .switchMap(action => {
            return this.usersService.saveUser(action.payload)
                .do(() => this.bsAlert.success({ title: 'Profile updated' }))
                .map(() => new SaveUserProfileSuccess())
                .catch(error => Observable.of(new SaveUserProfileFailure(error)));
        });
}
