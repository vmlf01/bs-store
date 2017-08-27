import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-product-card',
    template: `
        <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">
                    <a href="#">Item One</a>
                </h4>
                <h5>$24.99</h5>
            </div>
        </div>
    `,
    styles: []
})
export class ProductCardComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
