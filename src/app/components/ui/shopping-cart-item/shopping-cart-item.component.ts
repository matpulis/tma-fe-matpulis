import { Component, effect, inject, input, model, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuantitySelectorComponent } from "../quantity-selector/quantity-selector.component";
import { ProductsStore } from '../../../stores/products.store';

@Component({
  selector: 'app-shopping-cart-item',
  imports: [NgIf, RouterLink, CurrencyPipe, QuantitySelectorComponent],
  templateUrl: './shopping-cart-item.component.html',
  styleUrl: './shopping-cart-item.component.scss'
})
export class ShoppingCartItemComponent {
  productsStore = inject(ProductsStore)
  product = input<Product>()
  quantity = model(1)

  updateQuantityInCart = this.quantity.subscribe(quantity => {
    const product = this.product()
    if (!product) return

    this.productsStore.UpdateQuantityInCart(product.id, quantity)
  })

  onRemoveFromCart() {
    const product = this.product()
    if (!product) return
    this.productsStore.RemoveFromCart(product.id)
  }
}
