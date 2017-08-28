import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoadingService } from './shared/loading.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    const mockLoadingService = {
        show: jasmine.createSpy('show'),
        hide: jasmine.createSpy('hide'),
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
