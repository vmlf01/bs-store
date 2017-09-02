import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEmptyComponent } from './cart-empty.component';
import { mockCart } from '../../../../mockData/cart';

describe('CartEmptyComponent', () => {
    let component: CartEmptyComponent;
    let fixture: ComponentFixture<CartEmptyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartEmptyComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartEmptyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
