import { mockCart } from '../../../../mockData/cart';
import { mockUser } from '../../../../mockData/user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentComponent } from './order-payment.component';

describe('OrderPaymentComponent', () => {
    let component: OrderPaymentComponent;
    let fixture: ComponentFixture<OrderPaymentComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValues(
            Observable.of(mockUser),
            Observable.of({ contents: mockCart }),
        ),
        dispatch: jasmine.createSpy('dispatch'),
    };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderPaymentComponent],
            providers: [
                { provide: Store, useValue: mockStore },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderPaymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
