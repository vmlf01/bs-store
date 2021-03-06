import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IUserProfile } from '../../../interfaces/IUserProfile';
import { IMenuOption } from '../../../interfaces/IMenuOption';

@Component({
    selector: 'bs-header',
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" routerLink="">
                    <img src="assets/bs-store-logo.png">
                    {{ title }}
                </a>

                <button class="navbar-toggler navbar-toggler-right" type="button" (click)="isCollapsed = !isCollapsed">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link active" routerLink="./shop/cart">
                                <bs-cart-icon [itemCount]="itemCount"></bs-cart-icon>
                            </a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto" *ngIf="!isAuthenticated">
                        <li class="nav-item" >
                            <a class="nav-link active" routerLink="./login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" routerLink="./signup">Sign up</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto" *ngIf="isAuthenticated">
                        <li class="nav-item text-light">
                            <bs-user-dropdown
                                [profile]="profile"
                                [menuOptions]="menuOptions"
                                (optionSelected)="menuOptionSelected.emit($event)"
                            ></bs-user-dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,
    styles: []
})
export class HeaderComponent {
    @Input() title: string;
    @Input() itemCount: number;
    @Input() isAuthenticated: boolean;
    @Input() profile: IUserProfile;
    @Input() menuOptions: IMenuOption[];
    @Output() menuOptionSelected = new EventEmitter<IMenuOption>();

    isCollapsed = true;
}
