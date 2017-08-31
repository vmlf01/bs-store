import { CurrencyPipe } from '@angular/common';
import { BsCurrencyPipe } from './bs-currency.pipe';

describe('BsCurrencyPipe', () => {
    const mockCurrencyPipe = new CurrencyPipe('us');

    it('create an instance', () => {
        const pipe = new BsCurrencyPipe(mockCurrencyPipe);
        expect(pipe).toBeTruthy();
    });

    it('should format amount with 2 decimal places', () => {
        const pipe = new BsCurrencyPipe(mockCurrencyPipe);
        expect(pipe.transform(123.4321, 'USD')).toBe('$123.43');
        expect(pipe.transform(123.4351, 'USD')).toBe('$123.44');
        expect(pipe.transform(0, 'USD')).toBe('$0.00');
        expect(pipe.transform(10, 'USD')).toBe('$10.00');
    });
});
