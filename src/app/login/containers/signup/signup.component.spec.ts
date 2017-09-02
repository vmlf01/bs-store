import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupContainerComponent } from './signup.component';

describe('SignupContainerComponent', () => {
    let component: SignupContainerComponent;
    let fixture: ComponentFixture<SignupContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SignupContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
