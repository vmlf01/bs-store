export interface IProduct {
    id: string;
    name: string;
    price: number;
    currency: string;
    description: string;
    image: string;
    rating: number;
    isFeatured?: boolean;
}
