import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductsService } from "../services/products.service";
import { ShoppingCartItem } from "../models/shopping-cart.model";
import { ProductCategory } from "../models/product-category.model";



interface ProductsState {
    popularProducts: Product[];
    categories: ProductCategory[];
    loading: boolean;
    shoppingCart: ShoppingCartItem[]
}

const initialState: ProductsState = {
    popularProducts: [],
    categories: [],
    loading: false,
    shoppingCart: []
}

export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    // Methods
    withMethods((store, productsService = inject(ProductsService)) => ({
        InitProducts() {
            const data = localStorage.getItem('user.cart')

            patchState(store, { loading: true, shoppingCart: data ? JSON.parse(data) : [] });

            productsService.FetchPopularProducts().subscribe(response => patchState(store, {
                popularProducts: response.data.products,
                loading: false,
            }))

            productsService.FetchProductCategories().subscribe(response => {
                patchState(store, { categories: response.data.categories })
            })

        },
        AddToCart(product_id: string, quantity: number) {
            const itemIndex = store.shoppingCart().findIndex(item => item.product_id === product_id)
            const newQuantity = itemIndex === -1 ? quantity : store.shoppingCart()[itemIndex].quantity + quantity

            patchState(store, { shoppingCart: [...store.shoppingCart().filter(item => item.product_id !== product_id), { product_id, quantity: newQuantity }] })

            this.PersistToLocalStorage()
        },
        RemoveFromCart(product_id: string) {
            patchState(store, { shoppingCart: store.shoppingCart().filter(item => item.product_id !== product_id) })
            this.PersistToLocalStorage()
        },
        UpdateQuantityInCart(product_id: string, quantity: number) {
            if (quantity > 0) {
                patchState(store, { shoppingCart: store.shoppingCart().map(item => item.product_id === product_id ? { ...item, quantity } : item) })
            }

            this.PersistToLocalStorage()
        },
        PersistToLocalStorage() {
            localStorage.setItem('user.cart', JSON.stringify(store.shoppingCart()))
        }
    })),
    // Computed
    withComputed((state) => ({
        totalShoppingCartItems: computed(() => {
            return state.shoppingCart().reduce((total, item) => total + item.quantity, 0)
        }),
        popularCategories: computed(() => {


            return state.categories().slice(0, 6)
        })
    }))
);

