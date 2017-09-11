import { Routes } from '@angular/router';
import { OrdersListComponent } from './containers/orders-list/orders-list.component';
import { OrderDetailsComponent } from './containers/order-details/order-details.component';

export const routes: Routes = [
    {
        path: '',
        component: OrdersListComponent,
    },
    {
        path: ':userId/:orderId',
        component: OrderDetailsComponent,
    }
];
