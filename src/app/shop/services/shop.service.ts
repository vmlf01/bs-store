import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { IProduct } from '../../../interfaces/IProduct';

@Injectable()
export class ShopService {
    constructor(
        private afData: AngularFireDatabase,
    ) {
    }

    getProducts(lastId: string): Observable<IProduct[]> {
        return null;
    }

    getFeaturedProduct(): Observable<IProduct> {
        return this.afData.object(this._getFeaturedProductRef());
    }

    _getFeaturedProductRef() {
        return '/featured';
    }
}
