import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { sandboxOf } from 'angular-playground';

import { SignupFormComponent } from './signup-form.component';

export default sandboxOf(SignupFormComponent, {
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
    ],
    providers: [{
        provide: RECAPTCHA_SETTINGS,
        useValue: { siteKey: environment.recaptchaSiteKey }
    }],
})
    .add('default', {
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-signup-form></bs-signup-form>
                </div>
            </div>
        `
    });
