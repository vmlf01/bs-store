import { Component, Input } from '@angular/core';

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
                            <a class="nav-link active" routerLink="./shop">Shop</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" routerLink="./shop/cart">Cart</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" routerLink="./login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" routerLink="./signup">Sign up</a>
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
