import { IOrderItem } from './IOrderItem';

export interface ICartContents {
    items: IOrderItem[];
    total: number;
    shipping: number;
    currency: string;
}
