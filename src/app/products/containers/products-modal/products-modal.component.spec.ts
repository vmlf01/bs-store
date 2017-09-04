import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsModalComponent } from './products-modal.component';

describe('ProductsModalComponent', () => {
    let component: ProductsModalComponent;
    let fixture: ComponentFixture<ProductsModalComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: jasmine.createSpy('dispatch'),
    };

    const mockModal = {
        dismiss: jasmine.createSpy('dismiss'),
        close: jasmine.createSpy('close'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductsModalComponent],
            providers: [
                { provide: Store, useValue: mockStore },
                { provide: NgbActiveModal, useValue: mockModal },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
