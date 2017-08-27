import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContainerComponent } from './containers/home/home.component';
import { ItemDetailsContainerComponent } from './containers/item-details/item-details.component';

const routes: Routes = [
    {
        path: 'shop',
        component: HomeContainerComponent,
    },
    {
        path: 'item/:id',
        component: ItemDetailsContainerComponent,
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
