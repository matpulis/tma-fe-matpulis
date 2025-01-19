import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  readonly disabled = input<boolean>(false);
  readonly type = input<HTMLButtonElement['type']>('button');
}
