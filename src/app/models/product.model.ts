export type ProductImage = {
    id: string;
    url: string;
}

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
    },
    stock: number;
}

