import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsContainerComponent } from './item-details.component';
import { mockProduct } from '../../../../mockData/products';

describe('ItemDetailsContainerComponent', () => {
    let component: ItemDetailsContainerComponent;
    let fixture: ComponentFixture<ItemDetailsContainerComponent>;

    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    const mockRoute = {
        snapshot: {
            params: { id: 'id' },
        },
    };

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: jasmine.createSpy('dispatch'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemDetailsContainerComponent],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockRoute },
                { provide: Store, useValue: mockStore },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDetailsContainerComponent);
        component = fixture.componentInstance;
        component.product = mockProduct;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
