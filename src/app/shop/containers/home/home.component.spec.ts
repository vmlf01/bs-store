import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingService } from '../../../shared/loading.service';
import { HomeContainerComponent } from './home.component';
import { mockProduct } from '../../../../mockData/products';

describe('HomeComponent', () => {
    let component: HomeContainerComponent;
    let fixture: ComponentFixture<HomeContainerComponent>;

    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    const mockRoute = {};

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
                { provide: ActivatedRoute, useValue: mockRoute },
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
            expect(mockRouter.navigate).toHaveBeenCalledWith([mockProduct.id], { relativeTo: mockRoute });
        });
    });
});
