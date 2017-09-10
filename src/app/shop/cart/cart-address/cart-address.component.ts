import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAddress } from '../../../../interfaces/IAddress';

@Component({
    selector: 'bs-cart-address',
    template: `
        <bs-cart-container>
            <form class="form" role="form" novalidate="" [formGroup]="addressForm" (ngSubmit)="handleNext(addressForm)">
                <div class="card">
                    <div class="card-header">
                        {{ title }}
                    </div>

                    <div class="card-block mx-4">
                        <bs-address-editor [addressForm]="addressForm"></bs-address-editor>
                    </div>

                    <div class="card-footer">
                        <div class="row d-flex align-items-center">
                            <div class="col-md-3">
                                <button type="button" class="btn btn-secondary btn-sm btn-block" (click)="handleBack()">Back</button>
                            </div>
                            <div class="col-md-6"></div>
                            <div class="col-md-3">
                                <button type="submit" class="btn btn-primary btn-sm btn-block" [disabled]="!addressForm.valid">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </bs-cart-container>
    `,
    styles: []
})
export class CartAddressComponent implements OnInit {
    @Input() title = '';
    @Input() address: IAddress;
    @Output() onBack = new EventEmitter<IAddress>();
    @Output() onNext = new EventEmitter<IAddress>();

    addressForm: FormGroup;

    constructor() { }

    ngOnInit() {
        this.addressForm = new FormGroup({
            street: new FormControl(this.address && this.address.street || '', [ Validators.required ]),
            city: new FormControl(this.address && this.address.city || '', [ Validators.required ]),
            zip: new FormControl(this.address && this.address.zip || '', [ Validators.required ]),
            country: new FormControl(this.address && this.address.country || '', [ Validators.required ]),
        });
    }

    handleBack() {
        this.onBack.emit();
    }

    handleNext({ valid, value }) {
        if (!valid) {
            return;
        }

        this.onNext.emit({
            ...this.address,
            ...value,
        });
    }

}
