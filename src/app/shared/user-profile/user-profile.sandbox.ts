import { ReactiveFormsModule } from '@angular/forms';
import { mockUser } from '../../../mockData/user';
import { CommonModule } from '@angular/common';
import { sandboxOf } from 'angular-playground';

import { PageTitleComponent } from '../page-title/page-title.component';
import { UserProfileComponent } from './user-profile.component';

const defaultLogin = sandboxOf(UserProfileComponent, {
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        PageTitleComponent,
    ]
})
    .add('default', {
        context: {
            profile: mockUser,
        },
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-user-profile
                        [profile]="profile"
                    ></bs-user-profile>
                </div>
            </div>
        `
    });

export default defaultLogin;
