import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  imports: [],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.scss'
})
export class ProductRatingComponent {
  readonly rating = input<number>(0);

}
