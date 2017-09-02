import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { HomeContainerComponent } from './home.component';
import { mockProduct } from '../../../../mockData/products';
import * as FeaturedProductActions from '../../state/actions/featured-product.actions';
import * as ProductActions from '../../state/actions/product.actions';

describe('HomeComponent', () => {
    let component: HomeContainerComponent;
    let fixture: ComponentFixture<HomeContainerComponent>;

    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    const mockRoute = {};

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: jasmine.createSpy('dispatch'),
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
                { provide: Store, useValue: mockStore },
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

    it('should load featured product', () => {
        expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.any(FeaturedProductActions.LoadProductHighlight));
    });

    it('should load initial products list', () => {
        expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.any(ProductActions.LoadProducts));
    });

    describe('method: showItemDetails', () => {
        beforeEach(() => {
            component.showItemDetails(mockProduct);
        });

        it('should navigate to item details page', () => {
            expect(mockRouter.navigate).toHaveBeenCalledWith([mockProduct.id], { relativeTo: mockRoute });
        });
    });
});
