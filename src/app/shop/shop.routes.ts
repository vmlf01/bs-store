import { Routes } from '@angular/router';

import { HomeContainerComponent } from './containers/home/home.component';
import { ItemDetailsContainerComponent } from './containers/item-details/item-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeContainerComponent,
    },
    {
        path: ':id',
        component: ItemDetailsContainerComponent,
    },
];
