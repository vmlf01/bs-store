import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryComponent } from './order-summary.component';
import { mockOrder } from '../../../../mockData/order';

describe('OrderSummaryComponent', () => {
    let component: OrderSummaryComponent;
    let fixture: ComponentFixture<OrderSummaryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderSummaryComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderSummaryComponent);
        component = fixture.componentInstance;
        component.order = mockOrder;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
