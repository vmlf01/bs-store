import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContainerComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeContainerComponent;
    let fixture: ComponentFixture<HomeContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeContainerComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
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
});
