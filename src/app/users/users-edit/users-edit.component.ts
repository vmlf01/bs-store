import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IUserProfile } from '../../../interfaces/IUserProfile';
import { AppError } from '../../../interfaces/AppError';

@Component({
    selector: 'bs-users-edit',
    templateUrl: './users-edit.component.html',
    styles: []
})
export class UsersEditComponent implements OnInit {
    @Input() readOnly: boolean;
    @Input() isNew: boolean;
    @Input() user: IUserProfile;
    @Input() roles: string[];
    @Input() error: AppError;
    @Output() onSave = new EventEmitter<IUserProfile>();
    @Output() onCancel = new EventEmitter<void>();

    userForm: FormGroup;
    name: FormControl;
    email: FormControl;
    password: FormControl;
    picture: FormControl;
    role: FormControl;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.name = new FormControl(this.user.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]);
        this.role = new FormControl(this.user.role, [ Validators.required ]);
        // TODO: image selection control
        this.picture = new FormControl(this.user.picture, [ Validators.required ]);

        this.userForm = this.formBuilder.group({
            name: this.name,
            picture: this.picture,
            role: this.role,
        });

        if (this.isNew) {
            this.email = new FormControl('', [ Validators.required, Validators.email ]);
            this.userForm.addControl('email', this.email);

            this.password = new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(50) ]);
            this.userForm.addControl('password', this.password);
        }

        if (this.readOnly) {
            this.userForm.disable();
        }
    }

    handleSave({valid, value }) {
        if (!valid) {
            return;
        }

        this.onSave.emit({
            ...this.user,
            ...value,
        });
    }
}
