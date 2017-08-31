import { IProduct } from './IProduct';

export interface IOrderItem extends IProduct {
    quantity: number;
}
