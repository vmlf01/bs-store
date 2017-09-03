import { CommonModule } from '@angular/common';
import { sandboxOf } from 'angular-playground';

import { LettersFilterBarComponent } from './letters-filter-bar.component';

const defaultLogin = sandboxOf(LettersFilterBarComponent, {
    imports: [
        CommonModule,
    ],
})
    .add('default', {
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-letters-filter-bar></bs-letters-filter-bar>
                </div>
            </div>
        `
    });

export default defaultLogin;
