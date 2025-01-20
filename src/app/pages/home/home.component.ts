import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { HeroComponent } from "../../components/ui/hero/hero.component";
import { InfoCardComponent } from "../../components/ui/info-card/info-card.component";
import { PopularCategoriesComponent } from "../../components/ui/popular-categories/popular-categories.component";
import { PopularProductsComponent } from "../../components/ui/products/product-suggestions/product-suggestions.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ContainerComponent, PopularProductsComponent, HeroComponent, PopularCategoriesComponent, InfoCardComponent, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {



}
