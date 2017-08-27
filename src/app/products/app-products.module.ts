import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductHighlightComponent } from './product-highlight/product-highlight.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCardComponent } from './product-card/product-card.component';

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
