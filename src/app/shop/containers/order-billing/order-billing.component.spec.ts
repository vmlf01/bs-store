import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBillingComponent } from './order-billing.component';

describe('OrderBillingComponent', () => {
    let component: OrderBillingComponent;
    let fixture: ComponentFixture<OrderBillingComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: jasmine.createSpy('dispatch'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderBillingComponent],
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
        fixture = TestBed.createComponent(OrderBillingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
