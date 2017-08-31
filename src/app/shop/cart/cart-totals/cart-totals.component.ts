import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bs-cart-totals',
    template: `
        <div>
            <div class="totals-line">
                <div class="totals-line__label">Sub-total</div>
                <div class="totals-line__value">{{ subTotal | bsCurrency:currency }}</div>
            </div>
            <div class="totals-line">
                <div class="totals-line__label">Shipping</div>
                <div class="totals-line__value">{{ shipping | bsCurrency:currency }}</div>
            </div>
            <div class="totals-line">
                <div class="totals-line__label">Total</div>
                <div class="totals-line__value">{{ total | bsCurrency:currency }}</div>
            </div>
        </div>
    `,
    styles: [`
        .totals-line {
            display: flex;
            font-size: 1.2rem;
            padding: 5px 40px;
        }

        .totals-line__label {
            font-style: italic;
            flex: 1;
        }

        .totals-line__value {
            font-weight: bold;
        }
    `]
})
export class CartTotalsComponent implements OnInit {
    @Input() subTotal: number;
    @Input() shipping: number;
    @Input() total: number;
    @Input() currency: string;

    constructor() { }

    ngOnInit() {
    }
}
