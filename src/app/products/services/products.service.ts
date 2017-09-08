import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebaseApp from 'firebase/app';

import { IProduct } from '../../../interfaces/IProduct';
import { AppError } from '../../../interfaces/AppError';

@Injectable()
export class ProductsService {
    private featuredProduct: IProduct;

    constructor(
        private afData: AngularFireDatabase,
    ) {
        this.afData.object(this._getFeaturedProductRef())
            .subscribe(product => this.featuredProduct = product);
    }

    getProducts(startingLetter: string): Observable<IProduct[]> {
        const query = {
            orderByChild: '_sortName',
            startAt: startingLetter.toLowerCase(),
            endAt: `${startingLetter.toLowerCase()}\uf8ff`,
        };

        return this.afData.list(this._getProductsRef(), { query });
    }

    getProductDetails(productId: string): Observable<IProduct> {
        return this.afData.object(this._getProductRef(productId))
            .map(product => {
                product.isFeatured = !!(this.featuredProduct && this.featuredProduct.id === product.id);
                return product;
            });
    }

    saveProduct(product: IProduct): Observable<string> {
        product = { ...product };

        if (!product.id) {
            // create a new object
            const newRef = this.afData.list(this._getProductsRef()).push({});
            product.id = newRef.key;
        }

        // set property for filtering index
        product['_sortName'] = product.name.toLowerCase();

        const updates = {
            [this._getProductRef(product.id)]: product,
        };

        if (product.isFeatured) {
            updates[this._getFeaturedProductRef()] = product;
        } else if (this.featuredProduct && this.featuredProduct.id === product.id) {
            updates[this._getFeaturedProductRef()] = null;
        }

        return Observable.fromPromise(this.afData.object('/').update(updates))
            .map(() => product.id);
    }

    deleteProduct(productId: string): Observable<void> {
        if (!productId) {
            Observable.throw(new AppError('INVALID_ARGS', 'Invalid argument provided'));
        }

        return Observable.fromPromise(this.afData.list(this._getProductsRef()).remove(productId));
    }

    getNewBlankProduct(): IProduct {
        return {
            id: null,
            name: '',
            price: 0,
            currency: 'USD',
            description: '',
            image: null,
            rating: null,
        };
    }

    _getProductsRef() {
        return '/products';
    }

    _getProductRef(productId: string) {
        return `${this._getProductsRef()}/${productId}`;
    }

    _getFeaturedProductRef() {
        return '/featured';
    }
}
