import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'bs-cart-icon',
    template: `
        <div>
            <div>
                <i class="fa fa-shopping-cart d-none d-md-inline"></i>
                <span class="d-inline d-md-none">Cart</span>
                <span class="badge badge-pill badge-primary">{{ itemCount }}</span>
            </div>
        </div>
    `,
    styles: [''],
})
export class CartIconComponent implements OnInit {
    @Input() itemCount = 0;

    constructor() { }

    ngOnInit() {
    }

}
