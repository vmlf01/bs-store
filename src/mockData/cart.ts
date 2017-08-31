import { ICartContents } from '../interfaces/ICartContents';

export const mockCart: ICartContents = {
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
    total: 10,
    shipping: 2,
    currency: 'USD',
};
