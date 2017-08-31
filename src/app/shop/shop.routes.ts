import { Routes } from '@angular/router';

import { HomeContainerComponent } from './containers/home/home.component';
import { ItemDetailsContainerComponent } from './containers/item-details/item-details.component';
import { CartContainerComponent } from './containers/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeContainerComponent,
    },
    {
        path: 'cart',
        component: CartContainerComponent,
    },
    {
        path: ':id',
        component: ItemDetailsContainerComponent,
    },
];
