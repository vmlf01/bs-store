import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../shared/loading.service';
import { IProduct } from '../../../../interfaces/IProduct';

@Component({
    selector: 'bs-item-details',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <bs-product-details
                        *ngIf="product"
                        [product]="product"
                        (buyNowSelected)="addToCart($event)"
                    ></bs-product-details>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            padding: 50px 0;
        }
    `]
})
export class ItemDetailsContainerComponent implements OnInit {
    product: IProduct;

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
        this.loadingService.show();

        setTimeout(() => {
            this.product = {
                id: 'mock-item',
                name: 'test item',
                description: 'test desc',
                image: 'http://placehold.it/900x400',
                price: 10,
                currency: 'USD',
                rating: 4.5,
            };

            this.loadingService.hide();
        }, 500);
    }

    addToCart(product: IProduct) {
        console.log('BUY', product);
    }
}
