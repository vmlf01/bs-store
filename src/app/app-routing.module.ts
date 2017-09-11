import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContainerComponent } from './shop/containers/home/home.component';
import { LoginContainerComponent } from './login/containers/login/login.component';
import { SignupContainerComponent } from './login/containers/signup/signup.component';
import { loginRoutes } from './login/login.routes';
import { AuthorizationGuard } from './login/guards/authentication.guard';
import { PermissionCatalogAccess, PermissionOrdersAccess, PermissionUsersAccess } from './app.permissions';

const routes: Routes = [
    {
        path: 'shop',
        loadChildren: './shop/shop.module#AppShopModule',
    },
    {
        path: 'manage',
        children: [
            {
                path: 'products',
                loadChildren: './products/products.module#AppProductsModule',
                canLoad: [AuthorizationGuard],
                canActivate: [AuthorizationGuard],
                data: { permission: PermissionCatalogAccess },
            },
            {
                path: 'users',
                loadChildren: './users/users.module#AppUsersModule',
                canLoad: [AuthorizationGuard],
                canActivate: [AuthorizationGuard],
                data: { permission: PermissionUsersAccess },
            },
            {
                path: 'orders',
                loadChildren: './orders/orders.module#AppOrdersModule',
                canLoad: [AuthorizationGuard],
                canActivate: [AuthorizationGuard],
                data: { permission: PermissionOrdersAccess },
            },
        ],
    },
    {
        path: '',
        children: [
            { path: '', pathMatch: 'full', redirectTo: '/shop' },
            ...loginRoutes,
        ],
    },
    {
        path: '**',
        redirectTo: '/shop',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
