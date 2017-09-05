import { AddNewProduct, DeleteExistingProduct, EditExistingProduct, ShowExistingProduct } from '../../state/actions/product-details.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IProduct } from '../../../../interfaces/IProduct';
import { LoadProductsList } from '../../state/actions/products-list.actions';
import { selectProductsList, selectProducts } from '../../products.store';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { PermissionCatalogEditProduct, PermissionCatalogAddProduct, PermissionCatalogDeleteProduct } from '../../../app.permissions';

@Component({
    selector: 'bs-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    currentInitialLetter: Observable<string>;
    products: Observable<IProduct[]>;
    permissions: {
        canAdd: boolean;
        canEdit: boolean;
        canDelete: boolean;
    };

    constructor(
        private store: Store<any>,
        private authService: AuthorizationService,
    ) { }

    ngOnInit() {
        this.currentInitialLetter = this.store.select(selectProducts).map(state => state.currentInitial);
        this.products = this.store.select(selectProductsList);

        this.permissions = {
            canAdd: this.authService.hasPermissionTo(PermissionCatalogAddProduct),
            canEdit: this.authService.hasPermissionTo(PermissionCatalogEditProduct),
            canDelete: this.authService.hasPermissionTo(PermissionCatalogDeleteProduct),
        };

        this.loadProducts('a');
    }

    loadProducts(selectedInitial: string) {
        this.store.dispatch(new LoadProductsList(selectedInitial));
    }

    handleAdd() {
        this.store.dispatch(new AddNewProduct());
    }

    handleEdit(product: IProduct) {
        this.store.dispatch(this.permissions.canEdit ?
            new EditExistingProduct(product.id) :
            new ShowExistingProduct(product.id)
        );
    }

    handleDelete(product: IProduct) {
        this.store.dispatch(new DeleteExistingProduct(product.id));
    }
}
