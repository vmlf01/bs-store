import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UsersModalComponent } from '../../containers/users-modal/users-modal.component';
import * as ActionTypes from '../actions/user-details.actions';
import {
    AddNewUser,
    CancelUserDetailsModal,
    CloseUserDetailsModal,
    DeleteExistingUser,
    DeleteExistingUserFailure,
    DeleteExistingUserSuccess,
    EditExistingUser,
    OpenUserDetailsModal,
    OpenUserDetailsModalFailure,
    UserSaveFailure,
    UserSaveSuccess,
    SaveUserDetails,
    CancelDeleteExistingUser,
    ShowExistingUser,
} from '../actions/user-details.actions';
import { AppError } from '../../../../interfaces/AppError';
import { BsAlertService } from '../../../shared/bs-alert.service';
import { UsersService } from '../../../shared/users.service';

@Injectable()
export class UserDetailsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private usersService: UsersService,
        private ngbModal: NgbModal,
        private bsAlert: BsAlertService,
    ) {
    }

    @Effect() addUser$ = this.actions$
        .ofType<AddNewUser>(ActionTypes.ADD_NEW_USER)
        .map(action => new OpenUserDetailsModal(this.usersService.getNewBlankUser()));

    @Effect() editUser$ = this.actions$
        .ofType<EditExistingUser | ShowExistingUser>(
            ActionTypes.EDIT_EXISTING_USER,
            ActionTypes.SHOW_EXISTING_USER,
        )
        .switchMap(action => {
            return this.usersService.getUserDetails(action.payload).take(1)
                .map(user => new OpenUserDetailsModal(user))
                .catch(error => Observable.of(new OpenUserDetailsModalFailure(error)));
        });

    @Effect() openUserDetails$ = this.actions$
        .ofType<OpenUserDetailsModal>(ActionTypes.OPEN_USER_DETAILS_MODAL)
        .switchMap(action => {
            return Observable.fromPromise(this.ngbModal.open(UsersModalComponent).result)
                .map(() => new CloseUserDetailsModal())
                .catch(() => Observable.of(new CancelUserDetailsModal()));
        });

    @Effect() saveUser$ = this.actions$
        .ofType<SaveUserDetails>(ActionTypes.SAVE_USER_DETAILS)
        .switchMap(action => {
            return this.usersService.saveUser(action.payload)
                .map(userId => new UserSaveSuccess(userId))
                .catch(error => Observable.of(new UserSaveFailure(error)));
        });

    @Effect() deleteUser$ = this.actions$
        .ofType<DeleteExistingUser>(ActionTypes.DELETE_EXISTING_USER)
        .switchMap(action => {
            return Observable.fromPromise(this.bsAlert.confirm({
                title: 'Are you sure?',
                text: 'This will remove the selected user!',
                type: 'warning',
                confirmButtonText: 'Yes, delete it!',
            }))
                .switchMap(() => this.usersService.deleteUser(action.payload)
                    .map(() => new DeleteExistingUserSuccess())
                    .catch(error => Observable.of(new DeleteExistingUserFailure(error)))
                )
                .catch(error => Observable.of(new CancelDeleteExistingUser()));
        });
}

