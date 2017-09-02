import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { HomeContainerComponent } from './home.component';
import { mockProduct } from '../../../../mockData/products';
import * as FeaturedProductActions from '../../state/actions/featured-product.actions';
import * as ProductActions from '../../state/actions/product.actions';
import * as ShopActions from '../../state/actions/router.actions';

describe('HomeComponent', () => {
    let component: HomeContainerComponent;
    let fixture: ComponentFixture<HomeContainerComponent>;

    const dispatchSpy = jasmine.createSpy('dispatch');

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: dispatchSpy,
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeContainerComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
            providers: [
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
            expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.any(ShopActions.ShowProductDetails));
        });
    });
});
