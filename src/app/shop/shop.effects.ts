import { ProductEffects } from './state/effects/products.effects';
import { FeaturedProductEffects } from './state/effects/featured-product.effects';
import { OrderEffects } from './state/effects/order.effects';

export const shopEffects = [
    ProductEffects,
    FeaturedProductEffects,
    OrderEffects,
];
