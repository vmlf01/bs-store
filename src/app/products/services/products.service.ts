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
    constructor(
        private afData: AngularFireDatabase,
    ) {
    }

    getProducts(startingLetter: string): Observable<IProduct[]> {
        const query = {
            orderByChild: '_sortName',
            startAt: startingLetter.toLowerCase(),
            endAt: `${startingLetter.toLowerCase()}\uf8ff`,
        };

        return this.afData.list('/products', { query });
    }

    getProductDetails(productId: string): Observable<IProduct> {
        return this.afData.object(this._getProductRef(productId));
    }

    saveProduct(product: IProduct): Observable<string> {
        product = { ...product };

        if (!product.id) {
            // create a new object
            const newRef = this.afData.list('/products').push({});
            product.id = newRef.key;
        }

        // set property for filtering index
        product['_sortName'] = product.name.toLowerCase();

        return Observable.fromPromise(this.afData.object(this._getProductRef(product.id)).set(product))
            .map(() => product.id);
    }

    deleteProduct(productId: string): Observable<void> {
        if (!productId) {
            Observable.throw(new AppError('INVALID_ARGS', 'Invalid argument provided'));
        }

        return Observable.fromPromise(this.afData.list('/products').remove(productId));
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

    _getProductRef(productId: string) {
        return `/products/${productId}`;
    }
}
