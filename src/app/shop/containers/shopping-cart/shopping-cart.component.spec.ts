import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingService } from '../../../shared/loading.service';
import { ShoppingCartContainerComponent } from './shopping-cart.component';

describe('ShoppingCartContainerComponent', () => {
    let component: ShoppingCartContainerComponent;
    let fixture: ComponentFixture<ShoppingCartContainerComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: jasmine.createSpy('dispatch'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShoppingCartContainerComponent],
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
        fixture = TestBed.createComponent(ShoppingCartContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
