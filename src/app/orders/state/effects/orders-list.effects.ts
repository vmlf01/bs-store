import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as ActionTypes from '../actions/orders-list.actions';
import { LoadOrdersListSuccess, LoadOrdersList, LoadOrdersListFailure, DeleteExistingOrder, DeleteExistingOrderSuccess, DeleteExistingOrderFailure, CancelDeleteExistingOrder } from '../actions/orders-list.actions';
import { OrdersService } from '../../services/orders.service';
import { BsAlertService } from '../../../shared/bs-alert.service';

@Injectable()
export class OrdersListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private ordersService: OrdersService,
        private bsAlert: BsAlertService,
    ) {
    }

    @Effect() loadOrders$ = this.actions$
        .ofType<LoadOrdersList>(ActionTypes.LOAD_ORDERS_LIST)
        .switchMap(action => {
            return this.ordersService.getOrders()
                .map(orders => new LoadOrdersListSuccess({ orders }))
                .catch(error => Observable.of(new LoadOrdersListFailure(error)));
        });

    @Effect() deleteOrder$ = this.actions$
        .ofType<DeleteExistingOrder>(ActionTypes.DELETE_EXISTING_ORDER)
        .switchMap(action => {
            return Observable.fromPromise(this.bsAlert.confirm({
                title: 'Are you sure?',
                text: 'This will remove the selected order!',
                type: 'warning',
                confirmButtonText: 'Yes, delete it!',
            }))
                .switchMap(() => this.ordersService.deleteOrder(action.payload.requesterId, action.payload.id)
                    .map(() => new DeleteExistingOrderSuccess())
                    .catch(error => Observable.of(new DeleteExistingOrderFailure(error.code)))
                )
                .catch(() => Observable.of(new CancelDeleteExistingOrder()));
        });
}

