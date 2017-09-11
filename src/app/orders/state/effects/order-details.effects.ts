import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as ActionTypes from '../actions/orders-list.actions';
import * as OrderDetailsActionTypes from '../actions/order-details.actions';
import { OrdersService } from '../../services/orders.service';
import { AppError } from '../../../../interfaces/AppError';
import { BsAlertService } from '../../../shared/bs-alert.service';
import { LoadOrdersListSuccess, ShowOrderDetailsManagement, ShowOrdersManagement } from '../actions/orders-list.actions';
import { LoadOrderDetailsManagement, LoadOrderDetailsManagementSuccess, LoadOrderDetailsManagementFailure, UpdateOrderStatus, UpdateOrderStatusSuccess, UpdateOrderStatusFailure } from '../actions/order-details.actions';

@Injectable()
export class OrderDetailsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private ordersService: OrdersService,
        private ngbModal: NgbModal,
        private bsAlert: BsAlertService,
    ) {
    }

    @Effect() editOrder$ = this.actions$
        .ofType<ShowOrderDetailsManagement>(ActionTypes.SHOW_ORDER_DETAILS_MANAGEMENT)
        .map(action => new LoadOrderDetailsManagement(action.payload));

    @Effect() openOrderDetails$ = this.actions$
        .ofType<LoadOrderDetailsManagement>(OrderDetailsActionTypes.LOAD_ORDER_DETAILS_MANAGEMENT)
        .switchMap(action => {
            return this.ordersService.getOrderDetails(action.payload.requesterId, action.payload.id)
                .map(order => new LoadOrderDetailsManagementSuccess(order))
                .catch(error => Observable.of(new LoadOrderDetailsManagementFailure(error)));
        });

    @Effect() updateOrderStatus$ = this.actions$
        .ofType<UpdateOrderStatus>(OrderDetailsActionTypes.UPDATE_ORDER_STATUS)
        .switchMap(action => {
            return this.ordersService.updateOrderStatus(action.payload)
                .map(orderId => new UpdateOrderStatusSuccess())
                .catch(error => Observable.of(new UpdateOrderStatusFailure(error)));
        });

    @Effect() updateOrderStatusDone$ = this.actions$
        .ofType<UpdateOrderStatusSuccess>(OrderDetailsActionTypes.UPDATE_ORDER_STATUS_SUCCESS)
        .map(action => new ShowOrdersManagement());
}

