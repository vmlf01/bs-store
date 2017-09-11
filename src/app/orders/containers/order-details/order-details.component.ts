import { ActivatedRoute } from '@angular/router';
import { PermissionOrderChangeStatus } from '../../../app.permissions';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IOrder, OrderStatus } from '../../../../interfaces/IOrder';
import { AppError } from '../../../../interfaces/AppError';
import { UpdateOrderStatus } from '../../state/actions/order-details.actions';
import { ShowOrdersManagement } from '../../state/actions/orders-list.actions';
import { selectOrderDetails } from '../../orders.store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'bs-order-details',
    templateUrl: './order-details.component.html',
    styles: [`
        .order__address-panel {
            background-color: #FED766;
            margin-top: 10px;
            padding: 10px;
        }
    `]
})
export class OrderDetailsComponent implements OnInit {
    order: IOrder;
    error$: Observable<string>;
    readOnly: boolean;
    orderStatus: OrderStatus[] = [
        'PROCESSING_PAYMENT',
        'PREPARING',
        'READY',
    ];

    orderForm: FormGroup;
    status: FormControl;

    constructor(
        private store: Store<any>,
        private authService: AuthorizationService,
    ) { }

    ngOnInit() {
        this.error$ = this.store.select(selectOrderDetails)
            .map(details => details && details.error && details.error.message);

        this.store.select(selectOrderDetails)
            .take(1)
            .subscribe(details => {
                this.order = details.order;
                this.status = new FormControl(this.order.status, [ Validators.required ]);
                this.orderForm = new FormGroup({
                    status: this.status,
                });
            });

        this.readOnly = !this.authService.hasPermissionTo(PermissionOrderChangeStatus);
        if (this.readOnly) {
            this.orderForm.disable();
        }
    }

    handleSave({ valid, value }) {
        if (!valid) {
            return;
        }

        this.store.dispatch(new UpdateOrderStatus({
            ...this.order,
            ...value,
        }));
    }

    handleCancel() {
        this.store.dispatch(new ShowOrdersManagement());
    }
}
