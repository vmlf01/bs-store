import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersFilterBarComponent } from './letters-filter-bar.component';

describe('LettersFilterBarComponent', () => {
  let component: LettersFilterBarComponent;
  let fixture: ComponentFixture<LettersFilterBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersFilterBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
