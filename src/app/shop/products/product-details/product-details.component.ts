import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IProduct } from '../../../../interfaces/IProduct';

@Component({
    selector: 'bs-product-details',
    templateUrl: './product-details.component.html',
    styles: [`
        .card-img-top {
            max-height: 500px;
            object-fit: contain;
        }
    `]
})
export class ProductDetailsComponent implements OnInit {
    @Input() product: IProduct;
    @Output() buyNowSelected = new EventEmitter<IProduct>();

    constructor() { }

    ngOnInit() {
    }

    handleBuyClick() {
        this.buyNowSelected.emit(this.product);
    }
}
