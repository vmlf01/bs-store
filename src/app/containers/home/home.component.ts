import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-home',
    template: `
        <bs-product-highlight
        ></bs-product-highlight>

        <div class="container">
            <bs-product-list
            ></bs-product-list>
        </div>
    `,
    styles: []
})
export class HomeContainerComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

}
