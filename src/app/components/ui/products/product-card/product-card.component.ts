import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { RouterLink } from '@angular/router';
import { ProductRatingComponent } from "../product-rating/product-rating.component";

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, ProductRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: Product | null = null
}
