import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditComponent } from './users-edit.component';
import { mockUser } from '../../../mockData/user';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('UsersEditComponent', () => {
    let component: UsersEditComponent;
    let fixture: ComponentFixture<UsersEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NgbModule],
            declarations: [UsersEditComponent],
            providers: [
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersEditComponent);
        component = fixture.componentInstance;
        component.user = mockUser;
        component.roles = [];
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
