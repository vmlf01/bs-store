import { CurrencyPipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHighlightComponent } from './product-highlight.component';
import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';
import { mockProduct } from '../../../../mockData/products';

describe('ProductHighlightComponent', () => {
    let component: ProductHighlightComponent;
    let fixture: ComponentFixture<ProductHighlightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductHighlightComponent, BsCurrencyPipe],
            providers: [
                CurrencyPipe,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductHighlightComponent);
        component = fixture.componentInstance;
        component.product = { ...mockProduct };
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
