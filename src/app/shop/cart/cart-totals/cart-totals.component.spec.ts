import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalsComponent } from './cart-totals.component';
import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';

describe('CartTotalsComponent', () => {
    let component: CartTotalsComponent;
    let fixture: ComponentFixture<CartTotalsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartTotalsComponent, BsCurrencyPipe],
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
        fixture = TestBed.createComponent(CartTotalsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
