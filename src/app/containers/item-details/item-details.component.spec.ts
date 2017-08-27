import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsContainerComponent } from './item-details.component';

describe('ItemDetailsContainerComponent', () => {
    let component: ItemDetailsContainerComponent;
    let fixture: ComponentFixture<ItemDetailsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemDetailsContainerComponent],
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
