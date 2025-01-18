import { Component, effect, Input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { parse } from 'graphql';

@Component({
  selector: 'app-quantity-selector',
  imports: [FormsModule],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss'
})
export class QuantitySelectorComponent {
  @Input() quantity = signal(1)

  onAddQuantity() {
    this.quantity.set(parseInt(this.quantity().toString()) + 1)
  }

  onDeductQuantity() {
    if (this.quantity() > 1) {
      this.quantity.set(parseInt(this.quantity().toString()) - 1)
    }
  }


  private sanitizeQuantity = effect(() => {

    this.quantity.set(parseInt(this.quantity().toString().replace(/[^0-9]/g, '')))
  });
}
