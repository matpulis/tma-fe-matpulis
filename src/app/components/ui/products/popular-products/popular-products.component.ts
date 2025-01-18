import { Component, inject } from '@angular/core';
import { ProductsStore } from '../../../../stores/products.store';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss'
})
export class PopularProductsComponent {
  productsStore = inject(ProductsStore)



}
