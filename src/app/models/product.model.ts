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
    stock: number;
}
