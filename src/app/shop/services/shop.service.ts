import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

import { IProduct } from '../../../interfaces/IProduct';

const PageSize = 6;

@Injectable()
export class ShopService {
    constructor(
        private afData: AngularFireDatabase,
    ) {
    }

    getProducts(lastId: string): Observable<{ products: IProduct[], nextPage: string }> {
        const query = {
            orderByKey: true,
            startAt: lastId,
            limitToFirst: PageSize + 1,
        };
        return this.afData.list(this._getProductsRef(), { query })
            .map(results => {
                return {
                    products: results.slice(0, PageSize),
                    nextPage: results.length === PageSize + 1 && results[PageSize].id || '',
                };
            });
    }

    getProductDetails(productId: string): Observable<IProduct> {
        return this.afData.object(this._getProductRef(productId));
    }

    getFeaturedProduct(): Observable<IProduct> {
        return this.afData.object(this._getFeaturedProductRef());
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
