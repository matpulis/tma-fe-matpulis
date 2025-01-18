import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductsService } from "../services/products.service";
import { ShoppingCartItem } from "../models/shopping-cart.model";



interface ProductsState {
    products: Product[];
    loading: boolean;
    shoppingCart: ShoppingCartItem[]
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    shoppingCart: []
}

export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    // Methods
    withMethods((store, productsService = inject(ProductsService)) => ({
        InitProducts() {
            patchState(store, { loading: true });
            productsService.FetchProducts().subscribe(response => patchState(store, { products: response.data.products, loading: false }))
        },
        AddToShoppingCart(product_id: string, quantity: number) {
            const item = store.shoppingCart().findIndex(item => item.product_id === product_id)
            console.log(item);

            patchState(store, { shoppingCart: [...store.shoppingCart(), { product_id, quantity }] })
        }
    })),
    // Computed
    withComputed((state) => ({
        popularProducts: computed(() => {
            return state.products().filter(product => product.rating >= 3).slice(0, 4)
        }),
        totalShoppingCartItems: computed(() => {
            return state.shoppingCart().reduce((total, item) => total + item.quantity, 0)
        })
    }))
);

