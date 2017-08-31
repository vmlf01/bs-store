import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { mockCart } from '../../../../mockData/cart';
import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';

describe('CartItemComponent', () => {
    let component: CartItemComponent;
    let fixture: ComponentFixture<CartItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartItemComponent, BsCurrencyPipe],
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
        fixture = TestBed.createComponent(CartItemComponent);
        component = fixture.componentInstance;
        component.item = mockCart.items[0];
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
