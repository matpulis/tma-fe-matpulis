import { ProductCategory } from "./product-category.model";
import { ProductImage } from "./product-image.model";


export type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    images: ProductImage[];
    price: number;
    rating: number;
    collection: {
        name: string;
        slug: string;
    },
    categories: ProductCategory[]
    stock: number;
}
