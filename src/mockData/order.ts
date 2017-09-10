import { mockUser } from './user';
import { mockAddress } from './address';
import { IOrder } from '../interfaces/IOrder';

export const mockOrder: IOrder = {
    requesterId: mockUser.id,
    requester: mockUser.name,
    email: mockUser.email,
    items: [
        {
            id: 'mock-item',
            name: 'test item',
            description: 'test desc',
            image: 'test-image.jpg',
            price: 10,
            currency: 'USD',
            rating: 3,
            quantity: 1
        },
    ],
    subtotal: 10,
    shipping: 2,
    total: 12,
    currency: 'USD',
    shippingAddress: mockAddress,
    billingAddress: mockAddress,
    date: '2017-09-10T19:59:27.101Z',
};
