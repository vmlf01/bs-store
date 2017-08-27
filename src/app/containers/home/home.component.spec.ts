import { LoadingService } from '../../loading.service';
import { mockProduct } from '../../../mockData/products';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContainerComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeContainerComponent;
    let fixture: ComponentFixture<HomeContainerComponent>;

    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    const mockLoadingService = {
        show: jasmine.createSpy('show'),
        hide: jasmine.createSpy('hide'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeContainerComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: LoadingService, useValue: mockLoadingService },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('method: showItemDetails', () => {
        beforeEach(() => {
            component.showItemDetails(mockProduct);
        });

        it('should activate loading indicator', () => {
            expect(mockLoadingService.show).toHaveBeenCalled();
        });

        it('should navigate to item details page', () => {
            expect(mockRouter.navigate).toHaveBeenCalledWith(['item', mockProduct.id]);
        });
    });
});
