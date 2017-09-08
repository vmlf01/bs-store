import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { LoadUsersList } from '../../state/actions/users-list.actions';
import { AddNewUser, DeleteExistingUser, EditExistingUser, ShowExistingUser } from '../../state/actions/user-details.actions';
import { selectUsersList, selectUsers } from '../../users.store';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { PermissionEditUser, PermissionAddUser, PermissionDeleteUser } from '../../../app.permissions';

@Component({
    selector: 'bs-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit {
    currentInitialLetter: Observable<string>;
    users: Observable<IUserProfile[]>;
    permissions: {
        canAdd: boolean;
        canEdit: boolean;
        canDelete: boolean;
    };

    constructor(
        private store: Store<any>,
        private authService: AuthorizationService,
    ) { }

    ngOnInit() {
        this.currentInitialLetter = this.store.select(selectUsers).map(state => state.currentInitial);
        this.users = this.store.select(selectUsersList);

        this.permissions = {
            canAdd: this.authService.hasPermissionTo(PermissionAddUser),
            canEdit: this.authService.hasPermissionTo(PermissionEditUser),
            canDelete: this.authService.hasPermissionTo(PermissionDeleteUser),
        };

        this.loadUsers('a');
    }

    loadUsers(selectedInitial: string) {
        this.store.dispatch(new LoadUsersList(selectedInitial));
    }

    handleAdd() {
        this.store.dispatch(new AddNewUser());
    }

    handleEdit(user: IUserProfile) {
        this.store.dispatch(this.permissions.canEdit ?
            new EditExistingUser(user.id) :
            new ShowExistingUser(user.id)
        );
    }

    handleDelete(user: IUserProfile) {
        this.store.dispatch(new DeleteExistingUser(user.id));
    }
}
