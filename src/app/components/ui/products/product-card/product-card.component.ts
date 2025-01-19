import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { RouterLink } from '@angular/router';
import { ProductRatingComponent } from "../product-rating/product-rating.component";
import JSConfetti from 'js-confetti';
import { ProductsStore } from '../../../../stores/products.store';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, ProductRatingComponent, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  readonly product = input<Product>();

  viewType = input<'grid' | 'list'>('grid')

  productsStore = inject(ProductsStore)
  jsConfetti = new JSConfetti()

  alreadyAddedToCart = computed(() => {
    return this.productsStore.shoppingCart().some(item => item.product_id === this.product()?.id)
  })
  onAddToCart(event: Event) {
    event.stopPropagation()

    const product = this.product();
    if (product) {
      this.jsConfetti.addConfetti()
      this.productsStore.AddToCart(product.id, 1)
    }
  }
}
