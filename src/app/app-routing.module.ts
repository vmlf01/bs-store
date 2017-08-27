import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContainerComponent } from './shop/containers/home/home.component';


const routes: Routes = [
    {
        path: 'shop',
        loadChildren: './shop/shop.module#AppShopModule',
    },
    {
        path: '**',
        redirectTo: 'shop',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
