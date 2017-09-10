import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IOrder } from '../../../../interfaces/IOrder';
import { LoadOrdersList, DeleteExistingOrder } from '../../state/actions/orders-list.actions';
import { selectOrdersList, selectOrders } from '../../orders.store';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { PermissionOrderChangeStatus, PermissionDeleteOrder } from '../../../app.permissions';

@Component({
    selector: 'bs-orders-list',
    templateUrl: './orders-list.component.html',
    styles: [`
        .btn-link {
            padding-left: 0;
        }
    `]
})
export class OrdersListComponent implements OnInit {
    orders: Observable<IOrder[]>;
    permissions: {
        canEdit: boolean;
        canDelete: boolean;
    };

    constructor(
        private store: Store<any>,
        private authService: AuthorizationService,
    ) { }

    ngOnInit() {
        this.orders = this.store.select(selectOrdersList);

        this.permissions = {
            canEdit: this.authService.hasPermissionTo(PermissionOrderChangeStatus),
            canDelete: this.authService.hasPermissionTo(PermissionDeleteOrder),
        };

        this.loadOrders();
    }

    loadOrders() {
        this.store.dispatch(new LoadOrdersList());
    }

    handleEdit(order: IOrder) {
        // this.store.dispatch(this.permissions.canEdit ?
        //     new EditExistingOrder(order.id) :
        //     new ShowExistingOrder(order.id)
        // );
    }

    handleDelete(order: IOrder) {
        this.store.dispatch(new DeleteExistingOrder(order));
    }
}
