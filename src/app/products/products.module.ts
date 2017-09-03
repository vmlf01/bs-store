import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppSharedModule } from '../shared/shared.module';
import { routes } from './products.routes';
import { IProductsStore, productsFeatureName, reducers, initialState } from './products.store';
import { productsEffects } from './products.effects';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature<IProductsStore>(productsFeatureName, reducers, { initialState }),
        EffectsModule.forFeature(productsEffects),
        AppSharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
})
export class AppProductsModule { }
