import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

@Component({
    selector: 'bs-cart-item',
    template: `
        <div class="card cart-item">
            <img class="cart-item__image" [src]="item.image" alt="">
            <div class="cart-item__text">
                <h4 class="card-title">{{ item.name }}</h4>
                <p class="card-text">{{ item.description }}</p>
            </div>
            <div class="cart-item__values">
                <div>{{ item.price | bsCurrency:item.currency }}</div>
                <div>
                    <input
                        type="number"
                        name="quantity"
                        class="cart-item__quantity"
                        min="1"
                        step="1"
                        [value]="item.quantity"
                        (change)="handleQuantityChange($event.target.value)"
                    >
                </div>
                <div>{{ item.price * item.quantity | bsCurrency:item.currency }}</div>
                <div>
                    <button class="btn btn-danger btn-sm" (click)="removeItem.emit(item)">Remove</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .cart-item {
            align-content: center;
            margin: 5px 20px;
        }

        @media (min-width: 992px) {
            .cart-item {
                flex-direction: row;
                height: 150px;
            }
        }

        .cart-item__image {
            flex: 1;
            max-height: 200px;
            object-fit: cover;
        }

        .cart-item__text {
            flex: 3;
            padding: 5px 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .cart-item__values {
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 10px 0;
        }

        .cart-item__values > div {
        }

        .cart-item__quantity {
            width: 70px;
            padding: 5px;
            text-align: center;
        }
    `]
})
export class CartItemComponent implements OnInit {
    @Input() item: IOrderItem;
    @Output() quantityChange = new EventEmitter<{ item: IOrderItem, quantity: number}>();
    @Output() showItemDetails = new EventEmitter<IOrderItem>();
    @Output() removeItem = new EventEmitter<IOrderItem>();

    constructor() { }

    ngOnInit() {
    }

    handleQuantityChange(newQuantity: number) {
        this.quantityChange.emit({ item: this.item, quantity: newQuantity });
    }

}
