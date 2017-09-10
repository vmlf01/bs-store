import { IAddress } from './IAddress';
import { IOrderItem } from './IOrderItem';

export interface IOrder {
    requesterId: string;
    requester: string;
    items: IOrderItem[];
    total: number;
    shipping: number;
    currency: string;
    shippingAddress: IAddress;
    billingAddress: IAddress;
}
