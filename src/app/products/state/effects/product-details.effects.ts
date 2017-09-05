import { ProductsModalComponent } from '../../containers/products-modal/products-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadProductDetails } from '../../../shop/state/actions/product.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as ActionTypes from '../actions/product-details.actions';
import {
    AddNewProduct,
    CancelProductDetailsModal,
    CloseProductDetailsModal,
    DeleteExistingProduct,
    DeleteExistingProductFailure,
    DeleteExistingProductSuccess,
    EditExistingProduct,
    OpenProductDetailsModal,
    OpenProductDetailsModalFailure,
    ProductSaveFailure,
    ProductSaveSuccess,
    SaveProductDetails,
    CancelDeleteExistingProduct,
} from '../actions/product-details.actions';
import { ProductsService } from '../../services/products.service';
import { AppError } from '../../../../interfaces/AppError';
import { BsAlertService } from '../../../shared/bs-alert.service';

@Injectable()
export class ProductDetailsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private productsService: ProductsService,
        private ngbModal: NgbModal,
        private bsAlert: BsAlertService,
    ) {
    }

    @Effect() addProduct$ = this.actions$
        .ofType<AddNewProduct>(ActionTypes.ADD_NEW_PRODUCT)
        .map(action => new OpenProductDetailsModal(this.productsService.getNewBlankProduct()));

    @Effect() editProduct$ = this.actions$
        .ofType<EditExistingProduct>(ActionTypes.EDIT_EXISTING_PRODUCT)
        .switchMap(action => {
            return this.productsService.getProductDetails(action.payload).take(1)
                .map(product => new OpenProductDetailsModal(product))
                .catch(error => Observable.of(new OpenProductDetailsModalFailure(error)));
        });

    @Effect() openProductDetails$ = this.actions$
        .ofType<OpenProductDetailsModal>(ActionTypes.OPEN_PRODUCT_DETAILS_MODAL)
        .switchMap(action => {
            return Observable.fromPromise(this.ngbModal.open(ProductsModalComponent).result)
                .map(() => new CloseProductDetailsModal())
                .catch(() => Observable.of(new CancelProductDetailsModal()));
        });

    @Effect() saveProduct$ = this.actions$
        .ofType<SaveProductDetails>(ActionTypes.SAVE_PRODUCT_DETAILS)
        .switchMap(action => {
            return this.productsService.saveProduct(action.payload)
                .map(productId => new ProductSaveSuccess(productId))
                .catch(error => Observable.of(new ProductSaveFailure(error.code)));
        });

    @Effect() deleteProduct$ = this.actions$
        .ofType<DeleteExistingProduct>(ActionTypes.DELETE_EXISTING_PRODUCT)
        .switchMap(action => {
            return Observable.fromPromise(this.bsAlert.confirm({
                title: 'Are you sure?',
                text: 'This will remove the selected product!',
                type: 'warning',
                confirmButtonText: 'Yes, delete it!',
            }))
                .switchMap(() => this.productsService.deleteProduct(action.payload)
                    .map(() => new DeleteExistingProductSuccess())
                    .catch(error => Observable.of(new DeleteExistingProductFailure(error.code)))
                )
                .catch(() => Observable.of(new CancelDeleteExistingProduct()));
        });
}

