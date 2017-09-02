import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { TestBed, async } from '@angular/core/testing';

import { LoadingService } from './shared/loading.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    const mockLoadingService = {
        show: jasmine.createSpy('show'),
        hide: jasmine.createSpy('hide'),
    };

    const mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({})),
        dispatch: jasmine.createSpy('dispatch'),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: LoadingService, useValue: mockLoadingService },
                { provide: Store, useValue: mockStore },
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Buy Something'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Buy Something');
    }));
});
