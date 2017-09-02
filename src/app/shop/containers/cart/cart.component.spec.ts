import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingService } from '../../../shared/loading.service';
import { CartContainerComponent } from './cart.component';

describe('CartContainerComponent', () => {
    let component: CartContainerComponent;
    let fixture: ComponentFixture<CartContainerComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: jasmine.createSpy('dispatch'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartContainerComponent],
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
        fixture = TestBed.createComponent(CartContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
