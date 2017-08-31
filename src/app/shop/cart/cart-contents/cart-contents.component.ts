import { NgTools_InternalApi_NG2_ListLazyRoutes_Options } from '@angular/compiler-cli/src/ngtools_api';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICartContents } from '../../../../interfaces/ICartContents';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

@Component({
    selector: 'bs-cart-contents',
    template: `
        <div class="card">
            <div class="card-header">
                Shopping Cart
            </div>
            <div class="card-block">
                <bs-cart-item
                    *ngFor="let item of contents.items"
                    [item]="item"
                    (quantityChange)="updateItemQuantity.emit($event)"
                    (showItemDetails)="showItemDetails.emit($event)"
                    (removeItem)="removeItem.emit($event)"
                ></bs-cart-item>

                <bs-cart-totals
                    [subTotal]="contents.total"
                    [shipping]="contents.shipping"
                    [total]="contents.total + contents.shipping"
                ></bs-cart-totals>
            </div>
            <div class="card-footer">
                <div class="row d-flex align-items-center">
                    <div class="col-md-3">
                        <button class="btn btn-secondary btn-sm btn-block" (click)="continueShopping.emit()">Continue Shopping</button>
                    </div>
                    <div class="col-md-6"></div>
                    <div class="col-md-3">
                        <button class="btn btn-primary btn-sm btn-block" (click)="checkout.emit()">Order</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class CartContentsComponent implements OnInit {
    @Input() contents: ICartContents;
    @Output() updateItemQuantity = new EventEmitter<{ item: IOrderItem, quantity: number }>();
    @Output() checkout = new EventEmitter<void>();
    @Output() showItemDetails = new EventEmitter<IOrderItem>();
    @Output() removeItem = new EventEmitter<IOrderItem>();
    @Output() continueShopping = new EventEmitter<void>();

    constructor() { }

    ngOnInit() {
    }
}
