import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'bsCurrency',
})
export class BsCurrencyPipe implements PipeTransform {
    constructor(private currency: CurrencyPipe) {
    }

    transform(value: number, currencyCode: string) {
        return this.currency.transform(value, currencyCode, true, '1.2-2');
    }
}
