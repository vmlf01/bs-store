import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IOrder } from '../../../../interfaces/IOrder';

@Component({
    selector: 'bs-order-summary',
    templateUrl: './order-summary.component.html',
    styles: [`
        .order__address-panel {
            background-color: #FED766;
            margin-top: 20px;
            padding: 10px;
        }
    `]
})
export class OrderSummaryComponent implements OnInit {
    @Input() order: IOrder;
    @Output() onBack = new EventEmitter();
    @Output() makePayment = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    handleBack() {
        this.onBack.emit();
    }

    handlePayment() {
        this.makePayment.emit();
    }
}
