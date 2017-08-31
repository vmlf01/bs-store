import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bs-cart-totals',
    template: `
        <div>
            <div>
                <div>Sub-total</div>
                <div>{{ subTotal }}</div>
            </div>
            <div>
                <div>Shipping</div>
                <div>{{ shipping }}</div>
            </div>
            <div>
                <div>Total</div>
                <div>{{ total }}</div>
            </div>
        </div>
    `,
    styles: []
})
export class CartTotalsComponent implements OnInit {
    @Input() subTotal: number;
    @Input() shipping: number;
    @Input() total: number;

    constructor() { }

    ngOnInit() {
    }
}
