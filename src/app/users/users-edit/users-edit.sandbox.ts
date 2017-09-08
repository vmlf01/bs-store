import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { sandboxOf } from 'angular-playground';

import { UsersEditComponent } from './users-edit.component';
import { mockUser } from '../../../mockData/user';

const defaultEdit = sandboxOf(UsersEditComponent, {
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
})
    .add('default', {
        context: {
            user: mockUser,
            currencies: ['USD'],
        },
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-users-edit
                        [user]="user"
                        [roles]="roles"
                    ></bs-users-edit>
                </div>
            </div>
        `
    });

export default defaultEdit;
