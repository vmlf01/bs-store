import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IProduct } from '../../../../interfaces/IProduct';
import { LoadProductsList } from '../../state/actions/products-list.actions';
import { selectProductsList, selectProducts } from '../../products.store';

@Component({
    selector: 'bs-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    currentInitialLetter: Observable<string>;
    products: Observable<IProduct[]>;

    constructor(
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.currentInitialLetter = this.store.select(selectProducts).map(state => state.currentInitial);
        this.products = this.store.select(selectProductsList);

        this.loadProducts('a');
    }

    loadProducts(selectedInitial: string) {
        this.store.dispatch(new LoadProductsList(selectedInitial));
    }
}
