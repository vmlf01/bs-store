import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { mockProduct } from '../../../../mockData/products';
import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';

describe('ProductDetailsComponent', () => {
    let component: ProductDetailsComponent;
    let fixture: ComponentFixture<ProductDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductDetailsComponent, BsCurrencyPipe],
            providers: [
                CurrencyPipe,
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailsComponent);
        component = fixture.componentInstance;
        component.product = { ...mockProduct };
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
