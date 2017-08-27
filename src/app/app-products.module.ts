import { NgModule } from '@angular/core';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductHighlightComponent } from './products/product-highlight/product-highlight.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductCardComponent } from './products/product-card/product-card.component';

@NgModule({
    imports: [],
    declarations: [
        ProductCardComponent,
        ProductDetailsComponent,
        ProductHighlightComponent,
        ProductListComponent
    ],
    exports: [
        ProductCardComponent,
        ProductDetailsComponent,
        ProductHighlightComponent,
        ProductListComponent
    ],
})
export class AppProductsModule { }
