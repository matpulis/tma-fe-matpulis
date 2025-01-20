import { Component, inject } from '@angular/core';
import { ContainerComponent } from "../container/container.component";
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth.store';
import { DropdownComponent } from "../../ui/dropdowns/dropdown/dropdown.component";
import { DropdownMenuComponent } from "../../ui/dropdowns/dropdown-menu/dropdown-menu.component";
import { DropdownMenuItemComponent } from "../../ui/dropdowns/dropdown-menu-item/dropdown-menu-item.component";
import { NgOptimizedImage } from '@angular/common';
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { ProductsStore } from '../../../stores/products.store';

@Component({
  selector: 'app-main-header',
  imports: [ContainerComponent, RouterLink, DropdownComponent, DropdownMenuComponent, DropdownMenuItemComponent, NgOptimizedImage, SearchbarComponent],
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  authStore = inject(AuthStore)
  productStore = inject(ProductsStore)

  doLogout() {
    this.authStore.Logout()
  }
}
