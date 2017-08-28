import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHighlightComponent } from './product-highlight.component';
import { mockProduct } from '../../../../mockData/products';

describe('ProductHighlightComponent', () => {
    let component: ProductHighlightComponent;
    let fixture: ComponentFixture<ProductHighlightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductHighlightComponent]
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
