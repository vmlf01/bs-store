import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { sandboxOf } from 'angular-playground';

import { LoginFormComponent } from './login-form.component';

const defaultLogin = sandboxOf(LoginFormComponent, {
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
})
    .add('default', {
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-login-form></bs-login-form>
                </div>
            </div>
        `
    });

export default defaultLogin;
