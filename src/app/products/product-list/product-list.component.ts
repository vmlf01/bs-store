import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-product-list',
    template: `
        <div class="row">
            <div class="col-lg-4 col-md-6 mb-4">
                <bs-product-card></bs-product-card>
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
                <bs-product-card></bs-product-card>
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
                <bs-product-card></bs-product-card>
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
                <bs-product-card></bs-product-card>
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
                <bs-product-card></bs-product-card>
            </div>
            <div class="col-lg-4 col-md-6 mb-4">
                <bs-product-card></bs-product-card>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <button
                    type="button"
                    class="btn btn-outline-info btn-sm btn-block mb-4"
                >See More</button>
            </div>
        </div>
    `,
    styles: []
})
export class ProductListComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
