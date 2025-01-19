import { ProductImage } from "./product-image.model";
import { Product } from "./product.model";

export type ProductCategory = {
    id: string;
    slug: string;
    name: string;
    products: Product[];
    image: ProductImage
}