import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { selectUserDetails, selectRoles } from '../../users.store';
import { SaveUserDetails } from '../../state/actions/user-details.actions';
import { AppError } from '../../../../interfaces/AppError';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { PermissionCatalogEditProduct } from '../../../app.permissions';
import { IUserProfile, UserRoles } from '../../../../interfaces/IUserProfile';

@Component({
    selector: 'bs-users-modal',
    template: `
        <bs-users-edit
            [user]="user | async"
            [roles]="roles"
            [error]="error | async"
            [readOnly]="isReadOnly | async"
            (onCancel)="handleCancel()"
            (onSave)="handleSave($event)"
        ></bs-users-edit>
    `,
    styles: []
})
export class UsersModalComponent implements OnInit, OnDestroy {
    user: Observable<IUserProfile>;
    error: Observable<AppError>;
    roles: UserRoles[] = [];
    isReadOnly: Observable<boolean>;

    private subscriptions: Subscription[];

    constructor(
        private store: Store<any>,
        private activeModal: NgbActiveModal,
    ) { }

    ngOnInit() {
        this.store.select(selectRoles)
            .take(1)
            .subscribe(roles => {
                console.log('ROLES', roles)
                this.roles = roles;
            });
        this.user = this.store.select(selectUserDetails).map(state => state.user);
        this.error = this.store.select(selectUserDetails).map(state => state.error);
        this.isReadOnly = this.store.select(selectUserDetails).map(state => state.isReadOnly);

        this.subscriptions = [
            this.store.select(selectUserDetails)
                .map(state => state.isSaved)
                .subscribe(isSaved => isSaved && this.closeModal()),
        ];
    }

    ngOnDestroy() {
        this.unregisterSubscriptions();
    }

    unregisterSubscriptions() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    handleCancel() {
        this.closeModal();
    }

    handleSave(user) {
        this.store.dispatch(new SaveUserDetails(user));
    }

    closeModal() {
        this.unregisterSubscriptions();
        this.activeModal.close();
    }
}
