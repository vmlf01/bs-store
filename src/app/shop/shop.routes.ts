import { Routes } from '@angular/router';

import { HomeContainerComponent } from './containers/home/home.component';
import { ItemDetailsContainerComponent } from './containers/item-details/item-details.component';
import { ShoppingCartContainerComponent } from './containers/shopping-cart/shopping-cart.component';
import { OrderBillingComponent } from './containers/order-billing/order-billing.component';
import { OrderShippingComponent } from './containers/order-shipping/order-shipping.component';
import { AuthorizationGuard } from '../login/guards/authentication.guard';
import { PermissionAuthenticated } from '../app.permissions';
import { OrderPaymentComponent } from './containers/order-payment/order-payment.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeContainerComponent,
    },
    {
        path: 'cart',
        component: ShoppingCartContainerComponent,
    },
    {
        path: 'shipping',
        component: OrderShippingComponent,
        canLoad: [AuthorizationGuard],
        canActivate: [AuthorizationGuard],
        data: { permission: PermissionAuthenticated },
    },
    {
        path: 'billing',
        component: OrderBillingComponent,
        canLoad: [AuthorizationGuard],
        canActivate: [AuthorizationGuard],
        data: { permission: PermissionAuthenticated },
    },
    {
        path: 'summary',
        component: OrderPaymentComponent,
        canLoad: [AuthorizationGuard],
        canActivate: [AuthorizationGuard],
        data: { permission: PermissionAuthenticated },
    },
    {
        path: ':id',
        component: ItemDetailsContainerComponent,
    },
];
