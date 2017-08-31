import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartContentsComponent } from './cart-contents.component';
import { mockCart } from '../../../../mockData/cart';

describe('CartContentsComponent', () => {
    let component: CartContentsComponent;
    let fixture: ComponentFixture<CartContentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartContentsComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartContentsComponent);
        component = fixture.componentInstance;
        component.contents = mockCart;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
