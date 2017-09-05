import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../../../interfaces/IProduct';
import { selectProductDetails } from '../../products.store';
import { SaveProductDetails } from '../../state/actions/product-details.actions';
import { AppError } from '../../../../interfaces/AppError';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { PermissionCatalogEditProduct } from '../../../app.permissions';

@Component({
    selector: 'bs-products-modal',
    template: `
        <bs-products-edit
            [product]="product | async"
            [currencies]="currencies"
            [error]="error | async"
            [readOnly]="isReadOnly | async"
            (onCancel)="handleCancel()"
            (onSave)="handleSave($event)"
        ></bs-products-edit>
    `,
    styles: []
})
export class ProductsModalComponent implements OnInit, OnDestroy {
    product: Observable<IProduct>;
    error: Observable<AppError>;
    currencies = ['USD'];
    isReadOnly: Observable<boolean>;

    private subscriptions: Subscription[];

    constructor(
        private store: Store<any>,
        private activeModal: NgbActiveModal,
    ) { }

    ngOnInit() {
        this.product = this.store.select(selectProductDetails).map(state => state.product);
        this.error = this.store.select(selectProductDetails).map(state => state.error);
        this.isReadOnly = this.store.select(selectProductDetails).map(state => state.isReadOnly);

        this.subscriptions = [
            this.store.select(selectProductDetails)
                .map(state => state.isSaved)
                .subscribe(isSaved => isSaved && this.closeModal()),
        ];
    }

    ngOnDestroy() {
        this.unregisterSubscriptions();
    }

    unregisterSubscriptions() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    handleCancel() {
        this.closeModal();
    }

    handleSave(product) {
        this.store.dispatch(new SaveProductDetails(product));
    }

    closeModal() {
        this.unregisterSubscriptions();
        this.activeModal.close();
    }
}
