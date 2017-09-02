import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserProfile } from '../../../interfaces/IUserProfile';
import { IMenuOption } from '../../../interfaces/IMenuOption';

@Component({
    selector: 'bs-user-dropdown',
    template: `
        <div ngbDropdown class="d-inline-block">
            <div
                class="btn btn-dark"
                ngbDropdownToggle
            >
                {{ profile.name }}
                <img
                    class="user-avatar__image m-x-auto img-fluid rounded-circle"
                    [src]="profile.picture"
                    *ngIf="profile.picture"
                >
            </div>
            <div ngbDropdownMenu>
                <button
                    class="dropdown-item"
                    *ngFor="let option of menuOptions"
                    (click)="optionSelected.emit(option)"
                >{{ option.label }}</button>
            </div>
        </div>
  `,
    styles: [`
        .user-avatar__image {
            width: 30px;
            height: 30px;
            margin-left: 5px;
        }
    `]
})
export class UserDropdownComponent implements OnInit {
    @Input() profile: IUserProfile;
    @Input() menuOptions: IMenuOption[] = [];
    @Output() optionSelected = new EventEmitter<IMenuOption>();

    constructor() { }

    ngOnInit() {
    }
}
