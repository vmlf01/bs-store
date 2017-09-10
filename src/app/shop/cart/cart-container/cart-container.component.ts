import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-cart-container',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            padding: 30px 0;
        }
    `]
})
export class CartContainerComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
