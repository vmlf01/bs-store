import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { IProduct } from '../../../interfaces/IProduct';

@Component({
    selector: 'bs-product-list',
    template: `
        <div class="row">
            <div
                class="col-lg-4 col-md-6 mb-4"
                *ngFor="let product of products"
            >
                <bs-product-card
                    [product]="product"
                    (productSelected)="handleClick($event)"
                ></bs-product-card>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <button
                    class="btn btn-outline-info btn-sm btn-block mb-4"
                    [disabled]="loading"
                    (click)="handleSeeMoreClick()"
                >{{ loading ? 'Loading...' : 'See More' }}</button>
            </div>
        </div>
    `,
    styles: []
})
export class ProductListComponent implements OnInit {
    @Input() products: IProduct[];
    @Input() loading: boolean;
    @Output() productSelected = new EventEmitter<IProduct>();
    @Output() buyNowSelected = new EventEmitter<IProduct>();
    @Output() loadMoreSelected = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    handleClick(product: IProduct) {
        this.productSelected.emit(product);
    }

    handleSeeMoreClick() {
        this.loadMoreSelected.emit();
    }
}
