import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';

describe('ProductsListComponent', () => {
    let component: ProductsListComponent;
    let fixture: ComponentFixture<ProductsListComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of()),
        dispatch: jasmine.createSpy('dispatch'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductsListComponent, BsCurrencyPipe],
            providers: [
                CurrencyPipe,
                { provide: Store, useValue: mockStore },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
