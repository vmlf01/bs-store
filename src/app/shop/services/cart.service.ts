import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { IOrderItem } from '../../../interfaces/IOrderItem';
import { ICartContents } from '../../../interfaces/ICartContents';

@Injectable()
export class CartService {
    constructor() {
    }

    checkoutCart(cartContents: ICartContents): Observable<any> {
        return Observable.of().delay(500);
    }
}
