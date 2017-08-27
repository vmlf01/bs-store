import { LoadingService } from '../../loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '../../../interfaces/IProduct';

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

    constructor(private router: Router, private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.productHighlight = {
            id: 'item-0',
            name: 'Great Item!!!',
            image: 'http://placehold.it/700x400',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
            price: 24.99,
            currency: 'USD',
            rating: 4.5,
        };

        this.loadMoreItems();
    }

    showItemDetails(product: IProduct) {
        console.log('SHOW', product);
        this.router.navigate(['item', product.id]);
    }

    addToCart(product: IProduct) {
        console.log('BUY', product);
    }

    loadMoreItems() {
        this.loading = true;
        this.loadingService.show();
        setTimeout(() => {
            this.products = this.products.concat(
                Array.from(Array(9).keys())
                    .map(value => {
                        return {
                            id: `item-${this.products.length + value + 1}`,
                            name: `Item ${this.products.length + value + 1}`,
                            image: 'http://placehold.it/700x400',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!',
                            price: 10 + Math.round(Math.random() * 5000) / 100,
                            currency: 'USD',
                            rating: Math.round(Math.random() * 5),
                        };
                    })
            );
            this.loading = false;
            this.loadingService.hide();
        }, 500);
    }
}
