import { Component, Input } from '@angular/core';

@Component({
    selector: 'bs-header',
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" routerLink="" routerLinkActive="active">
                    <img src="assets/bs-store-logo.png">
                    {{ title }}
                </a>

                <button class="navbar-toggler navbar-toggler-right" type="button" (click)="isCollapsed = !isCollapsed">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/shop" routerLinkActive="active">Shop</a>
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

    isCollapsed = true;
}
