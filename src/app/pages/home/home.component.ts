import { Component, inject } from '@angular/core';
import { AuthStore } from '../../stores/auth.store';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { PopularProductsComponent } from "../../components/ui/products/popular-products/popular-products.component";

@Component({
  selector: 'app-home',
  imports: [ContainerComponent, PopularProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



}
