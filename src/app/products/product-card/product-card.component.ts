import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IProduct } from '../../../interfaces/IProduct';

@Component({
    selector: 'bs-product-card',
    template: `
        <div class="card h-100">
            <a href="" (click)="$event.preventDefault(); handleClick()"><img class="card-img-top" [src]="product.image" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">
                    <a href="" (click)="$event.preventDefault(); handleClick()">{{ product.name }}</a>
                </h4>
                <h5>{{ product.price | currency:product.currency:true:'1.2-2' }}</h5>
            </div>
        </div>
    `,
    styles: []
})
export class ProductCardComponent implements OnInit {
    @Input() product: IProduct;
    @Output() productSelected = new EventEmitter<IProduct>();

    constructor() { }

    ngOnInit() {
    }

    handleClick() {
        this.productSelected.emit(this.product);
    }
}
