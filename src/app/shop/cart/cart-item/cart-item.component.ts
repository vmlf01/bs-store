import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

@Component({
    selector: 'bs-cart-item',
    template: `
        <div class="card cart-item">
            <div class="row">
                <div class="col-md-4">
                    <img class="" [src]="item.image" alt="">
                </div>
                <div class="col-md-4">
                    <h4 class="card-title">{{ item.name }}</h4>
                    <p class="card-text">{{ item.description }}</p>
                </div>
                <div class="col-md-4">
                    <input type="number" name="quantity" [value]="item.quantity" (change)="handleQuantityChange($event.target.value)">
                    <button class="btn btn-danger btn-sm btn-block" (click)="removeItem.emit(item)">Remove</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .cart-item {
            height: 150px;
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
