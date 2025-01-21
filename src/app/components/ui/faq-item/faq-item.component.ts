import { Component, input } from '@angular/core';
import { FaqItem } from '../../../models/faq-item.model';

@Component({
  selector: 'app-faq-item',
  imports: [],
  templateUrl: './faq-item.component.html',
})
export class FaqItemComponent {
  faq = input.required<FaqItem>()
}
