import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { RouterLink } from '@angular/router';
import { ProductRatingComponent } from "../product-rating/product-rating.component";
import JSConfetti from 'js-confetti';
import { ProductsStore } from '../../../../stores/products.store';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, ProductRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: Product | null = null
  productsStore = inject(ProductsStore)
  jsConfetti = new JSConfetti()

  alreadyAddedToCart = computed(() => {
    return this.productsStore.shoppingCart().some(item => item.product_id === this.product?.id)
  })
  onAddToCart(event: Event) {
    event.stopPropagation()

    if (this.product) {
      this.jsConfetti.addConfetti()
      this.productsStore.AddToCart(this.product.id, 1)
    }
  }
}
