import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/fromPromise';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebaseApp from 'firebase/app';

import { IProduct } from '../../../interfaces/IProduct';

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
}
