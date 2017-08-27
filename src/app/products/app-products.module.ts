import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductHighlightComponent } from './product-highlight/product-highlight.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductRatingComponent } from './product-rating/product-rating.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ProductCardComponent,
        ProductDetailsComponent,
        ProductHighlightComponent,
        ProductListComponent,
        ProductRatingComponent,
    ],
    exports: [
        ProductCardComponent,
        ProductDetailsComponent,
        ProductHighlightComponent,
        ProductListComponent,
        ProductRatingComponent,
    ],
})
export class AppProductsModule { }
