import { NgTools_InternalApi_NG2_ListLazyRoutes_Options } from '@angular/compiler-cli/src/ngtools_api';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICartContents } from '../../../../interfaces/ICartContents';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

@Component({
    selector: 'bs-cart-empty',
    template: `
        <div class="card-block cart-empty__container">
            <img class="cart-empty__image" src="assets/shopping-bag.png">
            <div class="cart-empty__text">
                <h3 class="text-muted">Your shopping cart is empty</h3>
                <p>Why not have a look at some of our items?</p>
                <button class="btn btn-secondary btn-sm" (click)="continueShopping.emit()">Continue Shopping</button>
            </div>
        </div>
    `,
    styles: [`
        .cart-empty__container {
            padding: 2rem 4rem;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;
        }

        .cart-empty__image {
            max-height: 100px;
            margin: 20px;
        }

        @media (min-width: 500px) {
            .cart-empty__container {
                flex-direction: row;
            }

            .cart-empty__image {
                max-height: 180px;
            }
        }
    `]
})
export class CartEmptyComponent implements OnInit {
    @Output() continueShopping = new EventEmitter<void>();

    constructor() { }

    ngOnInit() {
    }
}
