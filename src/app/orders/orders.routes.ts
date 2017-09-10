import { Routes } from '@angular/router';
import { OrdersListComponent } from './containers/orders-list/orders-list.component';

export const routes: Routes = [
    {
        path: '',
        component: OrdersListComponent,
    }
];
