import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBillingComponent } from './order-billing.component';

describe('OrderBillingComponent', () => {
  let component: OrderBillingComponent;
  let fixture: ComponentFixture<OrderBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
