import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebaseApp from 'firebase/app';

import { IOrder } from '../../../interfaces/IOrder';
import { AppError } from '../../../interfaces/AppError';

@Injectable()
export class OrdersService {
    constructor(
        private afData: AngularFireDatabase,
    ) {
    }

    getOrders(): Observable<IOrder[]> {
        const query = {
            orderByKey: true,
        };

        return this.afData.list(this._getOrdersRef(), { query })
            .map(results =>
                results.reduce((orders: IOrder[], user) => {
                    const userOrders = Object.keys(user).map(orderId => ({ ...user[orderId], id: orderId }));
                    return orders.concat(userOrders);
                }, [])
            );
    }

    getOrderDetails(userId: string, orderId: string): Observable<IOrder> {
        return this.afData.object(this._getOrderRef(userId, orderId));
    }

    updateOrderStatus(order: IOrder): Observable<void> {
        return Observable.fromPromise(
            this.afData.object(this._getOrderRef(order.requesterId, order.id))
                .update({ status: order.status })
        );
    }

    deleteOrder(requesterId: string, orderId: string): Observable<void> {
        if (!requesterId || !orderId) {
            Observable.throw(new AppError('INVALID_ARGS', 'Invalid argument provided'));
        }

        return Observable.fromPromise(this.afData.list(this._getUserOrdersRef(requesterId)).remove(orderId));
    }

    _getOrdersRef() {
        return '/orders';
    }

    _getUserOrdersRef(userId: string) {
        return `${this._getOrdersRef()}/${userId}`;
    }

    _getOrderRef(userId: string, orderId: string) {
        return `${this._getUserOrdersRef(userId)}/${orderId}`;
    }
}
