import { Component, inject } from '@angular/core';
import { ProductsStore } from '../../../stores/products.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-categories',
  imports: [RouterLink],
  templateUrl: './popular-categories.component.html',
})
export class PopularCategoriesComponent {
  productsStore = inject(ProductsStore)




}
