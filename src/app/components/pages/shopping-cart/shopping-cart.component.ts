import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { ProductsStore } from '../../../stores/products.store';
import { ContainerComponent } from "../../layout/container/container.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { PopularProductsComponent } from "../../ui/products/product-suggestions/product-suggestions.component";
import { ShoppingCartItemComponent } from "../../ui/shopping-cart-item/shopping-cart-item.component";

@Component({
  selector: 'app-shopping-cart',
  imports: [ContainerComponent, FormsModule, ButtonComponent, RouterLink, PopularProductsComponent, ShoppingCartItemComponent, RouterLink, CurrencyPipe],
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit {
  productsStore = inject(ProductsStore)
  productService = inject(ProductsService)
  router = inject(Router)
  products = signal<Product[]>([])

  constructor() { effect(() => this.LoadCartItems()) }

  shoppingCartItems = computed(() => {
    return this.productsStore.shoppingCart().map(item => ({
      product: this.products().find(product => product.id === item.productId),
      quantity: item.quantity
    }))
  })

  LoadCartItems() {
    const productIds = this.productsStore.shoppingCart().map(item => item.productId)

    console.log(productIds);

    this.productService.FindProductsByIds(productIds).subscribe(products => {
      this.products.set(products.data.products)
    })
  }


  // Vouchers
  voucherInput = model('')
  voucherCode = signal('')
  discount = signal(0)

  ApplyVoucher() {
    if (this.voucherInput().length > 0) {
      this.voucherCode.set(this.voucherInput().toUpperCase())

      // Random discount between 10% and 90%
      this.discount.set(Math.floor(Math.random() * (90 - 10 + 1)) + 10)

      this.voucherInput.set('')
    }
  }

  RemoveVoucher() {
    this.voucherInput.set('')
    this.voucherCode.set('')
    this.discount.set(0)
  }

  // Order Summary
  totalSub = computed<number>(() => {
    let total = 0

    this.productsStore.shoppingCart().forEach(item => {
      total += item.quantity * (this.products().find(product => product.id === item.productId)?.price || 0)
    })

    return total || 0
  })
  totalDiscount = computed<number>(() => this.totalSub() * (this.discount() / 100))
  totalTax = computed<number>(() => (this.totalSub() - this.totalDiscount()) * 0.18)
  totalPrice = computed<number>(() => this.totalSub() - this.totalDiscount() + this.totalTax())

  ngOnInit(): void {
    this.LoadCartItems()
  }


  Checkout() {
    this.productsStore.ClearCart()
    this.router.navigate(['/order-confirmation'])
  }
}
