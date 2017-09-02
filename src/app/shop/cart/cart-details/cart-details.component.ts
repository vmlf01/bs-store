import { NgTools_InternalApi_NG2_ListLazyRoutes_Options } from '@angular/compiler-cli/src/ngtools_api';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICartContents } from '../../../../interfaces/ICartContents';
import { IOrderItem } from '../../../../interfaces/IOrderItem';

@Component({
    selector: 'bs-cart-details',
    template: `
        <div class="card-block">
            <div class="row">
                <div class="col-md-12">
                    <bs-cart-item
                        *ngFor="let item of contents.items"
                        [item]="item"
                        (quantityChange)="updateItemQuantity.emit($event)"
                        (showItemDetails)="showItemDetails.emit($event)"
                        (removeItem)="removeItem.emit($event)"
                    ></bs-cart-item>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 col-md-8">
                </div>
                <div class="col-sm-6 col-md-4">
                    <bs-cart-totals
                        [subTotal]="contents.total"
                        [shipping]="contents.shipping"
                        [total]="contents.total + contents.shipping"
                        [currency]="contents.currency"
                    ></bs-cart-totals>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class CartDetailsComponent implements OnInit {
    @Input() contents: ICartContents;
    @Output() updateItemQuantity = new EventEmitter<{ item: IOrderItem, quantity: number }>();
    @Output() showItemDetails = new EventEmitter<IOrderItem>();
    @Output() removeItem = new EventEmitter<IOrderItem>();

    constructor() { }

    ngOnInit() {
    }
}
