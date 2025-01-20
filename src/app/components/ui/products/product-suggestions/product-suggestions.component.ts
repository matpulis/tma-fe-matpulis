import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { ProductCategory } from '../../../../models/product-category.model';
import { Product } from '../../../../models/product.model';
import { ProductsService } from '../../../../services/products.service';
import { ProductsStore } from '../../../../stores/products.store';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-suggestions',
  imports: [ProductCardComponent],
  templateUrl: './product-suggestions.component.html',
})
export class PopularProductsComponent {
  productsStore = inject(ProductsStore)
  productsService = inject(ProductsService)
  category = input<string>()
  excludeIds = input<string[]>([])
  products = signal<Product[]>([])

  constructor() { effect(() => this.FindSuggestions()) }

  FindSuggestions() {
    const category = this.category();

    if (category) {
      this.productsService.FilterPaginateProducts('', [category], 4, 0, 'name_ASC', this.excludeIds()).subscribe(response => {
        const items = response.data.productsConnection.edges.map(item => item.node);

        this.products.set(
          this.excludeIds().length > 0 ?
            items.filter(item => !this.excludeIds().includes(item.id)) :
            items
        )
      })
    }
  }
}
