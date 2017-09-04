import { mockProduct } from '../../../mockData/products';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEditComponent } from './products-edit.component';

describe('ProductsEditComponent', () => {
    let component: ProductsEditComponent;
    let fixture: ComponentFixture<ProductsEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [ProductsEditComponent],
            providers: [
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsEditComponent);
        component = fixture.componentInstance;
        component.product = mockProduct;
        component.currencies = [];
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
