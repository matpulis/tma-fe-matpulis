import { Component, OnInit, signal, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ImageZoomComponent } from "../image-zoom/image-zoom.component";
import { ProductImage } from '../../../models/product-image.model';

@Component({
  selector: 'app-image-preview',
  imports: [NgClass, ImageZoomComponent],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss'
})
export class ImagePreviewComponent {
  readonly images = input<ProductImage[]>([]);

  current_index = signal(0)



  onChangeImage(index: number) {
    this.current_index.set(index)
  }
}
