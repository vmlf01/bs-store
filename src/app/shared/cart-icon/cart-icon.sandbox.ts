import { CommonModule } from '@angular/common';
import { sandboxOf } from 'angular-playground';

import { CartIconComponent } from './cart-icon.component';

const defaultLogin = sandboxOf(CartIconComponent, {
    imports: [
        CommonModule,
    ],
})
    .add('default', {
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-cart-icon></bs-cart-icon>
                </div>
            </div>
        `
    });

export default defaultLogin;
