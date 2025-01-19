import { Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '../../stores/auth.store';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { PopularProductsComponent } from "../../components/ui/products/popular-products/popular-products.component";
import { HeroComponent } from "../../components/ui/hero/hero.component";
import { interval } from 'rxjs';
import { PopularCategoriesComponent } from "../../components/ui/popular-categories/popular-categories.component";
import { InfoCardComponent } from "../../components/ui/info-card/info-card.component";

@Component({
  selector: 'app-home',
  imports: [ContainerComponent, PopularProductsComponent, HeroComponent, PopularCategoriesComponent, InfoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



}
