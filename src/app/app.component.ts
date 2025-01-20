import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthStore } from './stores/auth.store';
import { ProductsStore } from './stores/products.store';
import { fadeAnimation } from './shared/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  private authStore = inject(AuthStore)
  private productStore = inject(ProductsStore)
  public route = inject(ActivatedRoute)



  ngOnInit(): void {
    this.authStore.InitAuth();
    this.productStore.InitProducts();
  }
}
