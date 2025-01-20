import { Component, effect, input, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quantity-selector',
  imports: [FormsModule],
  templateUrl: './quantity-selector.component.html',
})
export class QuantitySelectorComponent {
  quantity = model(1);

  onAddQuantity() {
    this.quantity.set(parseInt(this.quantity().toString()) + 1)
  }

  onDeductQuantity() {
    if (this.quantity() > 1) {
      this.quantity.set(parseInt(this.quantity().toString()) - 1)
    }
  }
}
