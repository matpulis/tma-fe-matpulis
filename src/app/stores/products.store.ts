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
        AddToCart(product_id: string, quantity: number) {
            const itemIndex = store.shoppingCart().findIndex(item => item.product_id === product_id)
            const newQuantity = itemIndex === -1 ? quantity : store.shoppingCart()[itemIndex].quantity + quantity

            patchState(store, { shoppingCart: [...store.shoppingCart().filter(item => item.product_id !== product_id), { product_id, quantity: newQuantity }] })
        },
        RemoveFromCart(product_id: string) {
            patchState(store, { shoppingCart: store.shoppingCart().filter(item => item.product_id !== product_id) })
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

