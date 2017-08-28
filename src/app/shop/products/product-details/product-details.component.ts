import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IProduct } from '../../../../interfaces/IProduct';

@Component({
    selector: 'bs-product-details',
    templateUrl: './product-details.component.html',
    styles: []
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
