import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { mockProduct } from '../../../../mockData/products';
import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';

describe('ProductCardComponent', () => {
    let component: ProductCardComponent;
    let fixture: ComponentFixture<ProductCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductCardComponent, BsCurrencyPipe],
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
        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        component.product = { ...mockProduct };
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
