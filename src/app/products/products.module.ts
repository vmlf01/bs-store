import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppSharedModule } from '../shared/shared.module';
import { routes } from './products.routes';
import { IProductsStore, productsFeatureName, reducers, initialState } from './products.store';
import { productsEffects } from './products.effects';
import { ProductsListComponent } from './containers/products-list/products-list.component';
import { ProductsService } from './services/products.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature<IProductsStore>(productsFeatureName, reducers, { initialState }),
        EffectsModule.forFeature(productsEffects),
        AngularFireDatabaseModule,
        NgxDatatableModule,
        AppSharedModule,
    ],
    declarations: [
        ProductsListComponent,
    ],
    exports: [
    ],
    providers: [
        ProductsService,
    ],
})
export class AppProductsModule { }
