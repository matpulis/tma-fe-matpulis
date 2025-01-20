import { Component, ElementRef, inject, Renderer2, signal, input } from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  imports: [],
  templateUrl: './image-zoom.component.html',
})
export class ImageZoomComponent {
  src = input<string>('');
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);

  zoomed = signal(false);
  computedPosition = signal(`left: 0px; top: 0px;`);


  onMouseEnter() {
    this.zoomed.set(true);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.zoomed()) return;

    const { left, top, width, height } = (event.target as HTMLElement).getBoundingClientRect();
    const x = Math.floor(((event.clientX - left) / width) * 150 - 50);
    const y = Math.floor(((event.clientY - top) / height) * 150 - 50);

    this.computedPosition.set(`left: ${x * -2}px; top:${y * -2}px;`);
  }

  onMouseLeave() {
    this.zoomed.set(false);
    this.computedPosition.set(`left: 0px; top: 0px;`);
  }
}
