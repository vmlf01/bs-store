import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingService } from '../../../shared/loading.service';
import { ItemDetailsContainerComponent } from './item-details.component';

describe('ItemDetailsContainerComponent', () => {
    let component: ItemDetailsContainerComponent;
    let fixture: ComponentFixture<ItemDetailsContainerComponent>;

    const mockLoadingService = {
        show: jasmine.createSpy('show'),
        hide: jasmine.createSpy('hide'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemDetailsContainerComponent],
            providers: [
                { provide: LoadingService, useValue: mockLoadingService },
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
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
