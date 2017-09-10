import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAddress } from '../../../interfaces/IAddress';

@Component({
    selector: 'bs-address-editor',
    templateUrl: './address-editor.component.html',
    styles: []
})
export class AddressEditorComponent implements OnInit {
    @Input() title  = '';
    @Input() addressForm: FormGroup;

    street: FormControl;
    city: FormControl;
    zip: FormControl;
    country: FormControl;

    constructor() { }

    ngOnInit() {
        this.street = this.addressForm.controls['street'] as FormControl;
        this.city = this.addressForm.controls['city'] as FormControl;
        this.zip = this.addressForm.controls['zip'] as FormControl;
        this.country = this.addressForm.controls['country'] as FormControl;
    }
}
