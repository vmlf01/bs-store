import { IAddress } from './IAddress';
import { IOrderItem } from './IOrderItem';

export type OrderStatus = 'PROCESSING_PAYMENT' | 'PREPARING' | 'READY';

export interface IOrder {
    id?: string;
    requesterId: string;
    requester: string;
    items: IOrderItem[];
    total: number;
    shipping: number;
    currency: string;
    shippingAddress: IAddress;
    billingAddress: IAddress;
    status?: OrderStatus;
}
