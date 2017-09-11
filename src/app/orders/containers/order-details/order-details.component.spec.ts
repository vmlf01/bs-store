import { Observable } from 'rxjs/Rx';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';
import { OrderDetailsComponent } from './order-details.component';
import { mockOrder } from '../../../../mockData/order';
import { Store } from '@ngrx/store';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { CurrencyPipe } from '@angular/common';

describe('OrderDetailsComponent', () => {
    let component: OrderDetailsComponent;
    let fixture: ComponentFixture<OrderDetailsComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValues(Observable.of({}), Observable.of({ order: mockOrder })),
        dispatch: jasmine.createSpy('dispatch'),
    };

    const mockAuthorizationService = {
        hasPermissionTo: jasmine.createSpy('hasPermissionTo'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [OrderDetailsComponent, BsCurrencyPipe],
            providers: [
                CurrencyPipe,
                { provide: Store, useValue: mockStore },
                { provide: AuthorizationService, useValue: mockAuthorizationService },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
