import { Component, ElementRef, inject, Input, Renderer2, signal } from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  imports: [],
  templateUrl: './image-zoom.component.html',
  styleUrl: './image-zoom.component.scss'
})
export class ImageZoomComponent {
  @Input() src: string = '';

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
    const x = ((event.clientX - left) / width) * 150 - 50;
    const y = ((event.clientY - top) / height) * 150 - 50;

    this.computedPosition.set(`left: ${x * 2}px; top:${y * 2}px;`);
  }

  onMouseLeave() {
    this.zoomed.set(false);
    this.computedPosition.set(`left: 0px; top: 0px;`);
  }
}
