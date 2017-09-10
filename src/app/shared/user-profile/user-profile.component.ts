import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { IUserProfile } from '../../../interfaces/IUserProfile';
import { AppError } from '../../../interfaces/AppError';

@Component({
    selector: 'bs-user-profile',
    templateUrl: './user-profile.component.html',
    styles: []
})
export class UserProfileComponent implements OnInit {
    @Input() profile: IUserProfile;
    @Input() error: AppError;
    @Output() onSave = new EventEmitter<IUserProfile>();
    @Output() onCancel = new EventEmitter<void>();

    profileForm: FormGroup;
    name: FormControl;
    picture: FormControl;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.name = new FormControl(this.profile.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]);
        this.picture = new FormControl(this.profile.picture, [ Validators.required ]);
        this.profileForm = new FormGroup({
            name: this.name,
            picture: this.picture,
        });
    }

    handleCancel() {
        this.profileForm.reset({
            name: this.profile.name,
            picture: this.profile.picture,
        });
    }

    handleSave({valid, value }) {
        if (!valid) {
            return;
        }

        this.onSave.emit({
            ...this.profile,
            ...value,
        });
    }
}
