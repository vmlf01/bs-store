import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { BsCurrencyPipe } from '../../../shared/bs-currency.pipe';
import { AuthorizationService } from '../../../login/services/authorization.service';

describe('UsersListComponent', () => {
    let component: UsersListComponent;
    let fixture: ComponentFixture<UsersListComponent>;

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of()),
        dispatch: jasmine.createSpy('dispatch'),
    };

    const mockAuthorizationService = {
        hasPermissionTo: jasmine.createSpy('hasPermissionTo'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersListComponent, BsCurrencyPipe],
            providers: [
                CurrencyPipe,
                { provide: Store, useValue: mockStore },
                { provide: AuthorizationService, useValue: mockAuthorizationService },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
