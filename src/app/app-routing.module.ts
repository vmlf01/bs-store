import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContainerComponent } from './shop/containers/home/home.component';
import { LoginContainerComponent } from './login/containers/login/login.component';
import { SignupContainerComponent } from './login/containers/signup/signup.component';
import { loginRoutes } from './login/login.routes';

const routes: Routes = [
    {
        path: 'shop',
        loadChildren: './shop/shop.module#AppShopModule',
    },
    {
        path: '',
        children: [
            { path: '', pathMatch: 'full', redirectTo: '/shop' },
            ...loginRoutes,
        ],
    },
    // {
    //     path: '**',
    //     redirectTo: '/shop',
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
