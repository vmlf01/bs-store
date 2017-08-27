import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContainerComponent } from './containers/home/home.component';

const routes: Routes = [
    {
        path: 'shop',
        component: HomeContainerComponent,
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
