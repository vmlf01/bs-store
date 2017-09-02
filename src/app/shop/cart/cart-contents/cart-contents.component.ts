import { LOAD_PRODUCT_DETAILS } from '../../state/actions/product.actions';
import { NgTools_InternalApi_NG2_ListLazyRoutes_Options } from '@angular/compiler-cli/src/ngtools_api';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ICartContents } from '../../../../interfaces/ICartContents';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

@Component({
    selector: 'bs-cart-contents',
    template: `
        <div class="card">
            <div class="card-header">
                Shopping Cart
            </div>

            <bs-cart-details
                *ngIf="hasItems"
                [contents]="contents"
                (removeItem)="removeItem.emit($event)"
                (showItemDetails)="showItemDetails.emit($event)"
                (updateItemQuantity)="updateItemQuantity.emit($event)"
            ></bs-cart-details>

            <bs-cart-empty
                *ngIf="!hasItems"
                (continueShopping)="continueShopping.emit()"
            ></bs-cart-empty>

            <div class="card-footer" *ngIf="hasItems">
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
export class CartContentsComponent implements OnInit, OnChanges {
    @Input() contents: ICartContents;
    @Output() updateItemQuantity = new EventEmitter<{ item: IOrderItem, quantity: number }>();
    @Output() checkout = new EventEmitter<void>();
    @Output() showItemDetails = new EventEmitter<IOrderItem>();
    @Output() removeItem = new EventEmitter<IOrderItem>();
    @Output() continueShopping = new EventEmitter<void>();

    hasItems = false;

    constructor() { }

    ngOnInit() {
        this.hasItems = this.contents.items.length > 0;
    }

    ngOnChanges() {
        this.hasItems = this.contents.items.length > 0;
    }
}
