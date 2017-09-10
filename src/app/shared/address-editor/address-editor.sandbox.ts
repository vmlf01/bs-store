import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { mockUser } from '../../../mockData/user';
import { CommonModule } from '@angular/common';
import { sandboxOf } from 'angular-playground';

import { AddressEditorComponent } from './address-editor.component';

const defaultLogin = sandboxOf(AddressEditorComponent, {
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
})
    .add('default', {
        context: {
            addressForm: new FormGroup({
                street: new FormControl(),
                city: new FormControl(),
                zip: new FormControl(),
                country: new FormControl(),
            }),
        },
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-address-editor
                        [title]="'Address'"
                        [addressForm]="addressForm"
                    ></bs-address-editor>
                </div>
            </div>
        `
    });

export default defaultLogin;
