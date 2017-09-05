import { AppError } from '../../../interfaces/AppError';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../interfaces/IProduct';

@Component({
    selector: 'bs-products-edit',
    templateUrl: './products-edit.component.html',
    styles: []
})
export class ProductsEditComponent implements OnInit {
    @Input() readOnly: boolean;
    @Input() product: IProduct;
    @Input() currencies: string[];
    @Input() error: AppError;
    @Output() onSave = new EventEmitter<IProduct>();
    @Output() onCancel = new EventEmitter<void>();

    productForm: FormGroup;
    name: FormControl;
    price: FormControl;
    currency: FormControl;
    description: FormControl;
    image: FormControl;
    rating: FormControl;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.name = new FormControl(this.product.name, [ Validators.required ]);
        this.price = new FormControl(this.product.price, [ Validators.required, Validators.min(0.01) ]);
        this.currency = new FormControl(this.product.currency, [ Validators.required ]);
        this.description = new FormControl(this.product.description);
        // TODO: image selection control
        this.image = new FormControl(this.product.image, [ Validators.required ]);
        this.rating = new FormControl(this.product.rating);

        this.productForm = this.formBuilder.group({
            name: this.name,
            price: this.price,
            currency: this.currency,
            description: this.description,
            image: this.image,
            rating: this.rating,
        });

        if (this.readOnly) {
            this.productForm.disable();
        }
    }

    handleSave({valid, value }) {
        if (!valid) {
            return;
        }

        this.onSave.emit({
            ...this.product,
            ...value,
        });
        // this.productForm.markAsPristine();
    }

}
