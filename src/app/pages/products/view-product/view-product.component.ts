import { Component, inject, OnInit, signal } from '@angular/core';
import { ContainerComponent } from "../../../components/layout/container/container.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ImagePreviewComponent } from "../../../components/ui/image-preview/image-preview.component";
import { ProductRatingComponent } from "../../../components/ui/products/product-rating/product-rating.component";
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../components/ui/button/button.component";
import { QuantitySelectorComponent } from "../../../components/ui/quantity-selector/quantity-selector.component";
import JSConfetti from 'js-confetti'
import { ProductsStore } from '../../../stores/products.store';

@Component({
  selector: 'app-view-product',
  imports: [ContainerComponent, ReactiveFormsModule, RouterLink, NgIf, ImagePreviewComponent, ProductRatingComponent, CurrencyPipe, ButtonComponent, QuantitySelectorComponent],
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
      this.productsStore.AddToShoppingCart(product.id, this.quantity())
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
