import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from "../../layout/container/container.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { RouterLink } from '@angular/router';
import { ProductsStore } from '../../../stores/products.store';
import { Product } from '../../../models/product.model';
import { PopularProductsComponent } from "../../ui/products/popular-products/popular-products.component";

@Component({
  selector: 'app-shopping-cart',
  imports: [ContainerComponent, ButtonComponent, RouterLink, PopularProductsComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  productsStore = inject(ProductsStore)

  ngOnInit(): void {
    const product_ids = this.productsStore.shoppingCart().map(item => item.product_id)

    console.log(product_ids);

  }
}
