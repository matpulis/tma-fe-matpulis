import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import JSConfetti from 'js-confetti';
import { ContainerComponent } from "../../../components/layout/container/container.component";
import { BreadcrumbsComponent } from "../../../components/ui/breadcrumbs/breadcrumbs.component";
import { ButtonComponent } from "../../../components/ui/button/button.component";
import { ImagePreviewComponent } from "../../../components/ui/image-preview/image-preview.component";
import { ProductRatingComponent } from "../../../components/ui/products/product-rating/product-rating.component";
import { QuantitySelectorComponent } from "../../../components/ui/quantity-selector/quantity-selector.component";
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { ProductsStore } from '../../../stores/products.store';
import { CountdownTimerComponent } from "../../../components/ui/countdown-timer/countdown-timer.component";
import { PopularProductsComponent } from "../../../components/ui/products/popular-products/popular-products.component";

@Component({
  selector: 'app-view-product',
  imports: [ContainerComponent, ReactiveFormsModule, NgIf, ImagePreviewComponent, ProductRatingComponent, CurrencyPipe, ButtonComponent, QuantitySelectorComponent, BreadcrumbsComponent, CountdownTimerComponent, PopularProductsComponent],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {
  jsConfetti = new JSConfetti()

  route = inject(ActivatedRoute)
  router = inject(Router)
  productsService = inject(ProductsService)
  productsStore = inject(ProductsStore)

  review_count = Math.floor(Math.random() * 100)
  product_id = signal('')
  quantity = signal(1)
  addedToCart = signal(false)
  product = signal<Product | null>(null)
  cartCount = computed(() => {
    const cartItem = this.productsStore.shoppingCart().find(item => item.product_id === this.product_id());

    return cartItem ? cartItem.quantity : 0
  })
  FindProduct() {
    if (this.product_id() && this.product_id().length > 0) {
      this.productsService.SearchProducts(this.product_id() || '').subscribe(response => {

        if (response.data.products.length > 0) {
          this.product.set(response.data.products[0])
        } else {
          this.router.navigate(['']);
        }
      })
    } else {
      this.router.navigate(['']);
    }
  }

  onAddToCart() {
    const product = this.product();

    if (product) {
      this.jsConfetti.addConfetti()
      this.addedToCart.set(true)
      this.productsStore.AddToCart(product.id, this.quantity())
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.product_id.set(params.get('id') || '')
      this.quantity.set(1)
      this.addedToCart.set(false)
      this.FindProduct()

    })
  }
}
