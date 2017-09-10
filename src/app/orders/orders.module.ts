import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppSharedModule } from '../shared/shared.module';
import { routes } from './orders.routes';
import { IOrdersStore, ordersFeatureName, reducers, initialState } from './orders.store';
import { ordersEffects } from './orders.effects';
import { OrdersListComponent } from './containers/orders-list/orders-list.component';
import { OrdersService } from './services/orders.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature<IOrdersStore>(ordersFeatureName, reducers, { initialState }),
        EffectsModule.forFeature(ordersEffects),
        AngularFireDatabaseModule,
        NgbModule,
        NgxDatatableModule,
        AppSharedModule,
    ],
    declarations: [
        OrdersListComponent,
    ],
    exports: [
    ],
    providers: [
        OrdersService,
    ],
})
export class AppOrdersModule { }
