import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  imports: [],
  templateUrl: './info-card.component.html',
})
export class InfoCardComponent {
  src = input('')
  title = input('')
  subTitle = input('')
}
