import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContainerComponent } from './login.component';

describe('LoginContainerComponent', () => {
    let component: LoginContainerComponent;
    let fixture: ComponentFixture<LoginContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
