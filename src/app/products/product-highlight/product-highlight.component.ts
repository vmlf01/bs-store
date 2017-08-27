import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { IProduct } from '../../../interfaces/IProduct';

@Component({
    selector: 'bs-product-highlight',
    template: `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <a href="" (click)="$event.preventDefault(); handleClick()"><img class="card-img-top" [src]="product.image" alt=""></a>
                </div>
                <div class="col-md-6">
                    <h4 class="card-title">
                        <a href="" (click)="$event.preventDefault(); handleClick()">{{ product.name }}</a>
                    </h4>
                    <h5>{{ product.price | currency:product.currency:true:'1.2-2' }}</h5>

                    <hr class="my-4">

                    <p>{{ product.description }}</p>
                    <p class="lead">
                        <button class="btn btn-primary btn-lg" (click)="handleBuyClick()">Buy Now</button>
                    </p>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class ProductHighlightComponent implements OnInit {
    @Input() product: IProduct;
    @Output() productSelected = new EventEmitter<IProduct>();
    @Output() buyNowSelected = new EventEmitter<IProduct>();

    constructor() { }

    ngOnInit() {
    }

    handleClick() {
        this.productSelected.emit(this.product);
    }

    handleBuyClick() {
        this.buyNowSelected.emit(this.product);
    }
}
