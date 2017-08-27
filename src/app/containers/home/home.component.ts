import { IProduct } from '../../../interfaces/IProduct';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-home',
    template: `
        <bs-product-highlight
            [product]="productHighlight"
            (productSelected)="showItemDetails($event)"
            (buyNowSelected)="addToCart($event)"
        ></bs-product-highlight>

        <div class="container">
            <bs-product-list
                [loading]="loading"
                [products]="products"
                (productSelected)="showItemDetails($event)"
                (loadMoreSelected)="loadMoreItems()"
            ></bs-product-list>
        </div>
    `,
    styles: []
})
export class HomeContainerComponent implements OnInit {
    productHighlight: IProduct;
    products: IProduct[] = [];
    loading: boolean;

    constructor() {
    }

    ngOnInit() {
        this.productHighlight = {
            name: 'Great Item!!!',
            image: 'http://placehold.it/700x400',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
            price: 24.99,
            currency: 'USD',
        };

        this.loadMoreItems();
    }

    showItemDetails(product) {
        console.log('SHOW', product);
    }

    addToCart(product) {
        console.log('BUY', product);
    }

    loadMoreItems() {
        this.loading = true;
        setTimeout(() => {
            this.products = this.products.concat(
                Array.from(Array(9).keys())
                    .map(value => {
                        return {
                            name: `Item ${this.products.length + value + 1}`,
                            image: 'http://placehold.it/700x400',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
                            price: 10 + Math.round(Math.random() * 5000) / 100,
                            currency: 'USD',
                        };
                    })
            );
            this.loading = false;
        }, 500);
    }
}
