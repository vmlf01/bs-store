import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-home',
    template: `
        <bs-product-highlight
        ></bs-product-highlight>

        <bs-product-list
        ></bs-product-list>
    `,
    styles: []
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

}
