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
    @Input() user: IUserProfile;
    @Input() roles: string[];
    @Input() error: AppError;
    @Output() onSave = new EventEmitter<IUserProfile>();
    @Output() onCancel = new EventEmitter<void>();

    userForm: FormGroup;
    name: FormControl;
    picture: FormControl;
    role: FormControl;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.name = new FormControl(this.user.name, [ Validators.required ]);
        this.role = new FormControl(this.user.role, [ Validators.required ]);
        // TODO: image selection control
        this.picture = new FormControl(this.user.picture, [ Validators.required ]);

        this.userForm = this.formBuilder.group({
            name: this.name,
            picture: this.picture,
            role: this.role,
        });

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
