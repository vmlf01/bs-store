import { SaveUserProfile } from '../../state/actions/profile.actions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppError } from '../../../../interfaces/AppError';
import { IUserProfile } from '../../../../interfaces/IUserProfile';
import { selectUserProfile, selectProfileError } from '../../login.store';

@Component({
    selector: 'bs-profile',
    template: `
        <div class="container mb-4">
            <bs-user-profile
                [profile]="profile$ | async"
                [error]="error$ | async"
                (onSave)="handleOnSave($event)"
            ></bs-user-profile>
        </div>
    `,
    styles: []
})
export class ProfileContainerComponent implements OnInit {
    profile$: Observable<IUserProfile>;
    error$: Observable<AppError>;

    constructor(
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.profile$ = this.store.select(selectUserProfile);
        this.error$ = this.store.select(selectProfileError);
    }

    handleOnSave(profile) {
        this.store.dispatch(new SaveUserProfile(profile));
    }
}
