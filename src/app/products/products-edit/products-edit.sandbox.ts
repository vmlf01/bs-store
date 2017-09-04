import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { sandboxOf } from 'angular-playground';

import { ProductsEditComponent } from './products-edit.component';
import { mockProduct } from '../../../mockData/products';

const defaultEdit = sandboxOf(ProductsEditComponent, {
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
})
    .add('default', {
        context: {
            product: mockProduct,
            currencies: ['USD'],
        },
        template: `
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <bs-products-edit
                        [product]="product"
                        [currencies]="currencies"
                    ></bs-products-edit>
                </div>
            </div>
        `
    });

export default defaultEdit;
