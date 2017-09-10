import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAddressComponent } from './cart-address.component';

describe('CartAddressComponent', () => {
    let component: CartAddressComponent;
    let fixture: ComponentFixture<CartAddressComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartAddressComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
