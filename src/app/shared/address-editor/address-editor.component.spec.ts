import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEditorComponent } from './address-editor.component';

describe('AddressEditorComponent', () => {
    let component: AddressEditorComponent;
    let fixture: ComponentFixture<AddressEditorComponent>;

    const mockAddressForm = new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        zip: new FormControl(),
        country: new FormControl(),
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AddressEditorComponent],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressEditorComponent);
        component = fixture.componentInstance;
        component.addressForm = mockAddressForm;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
