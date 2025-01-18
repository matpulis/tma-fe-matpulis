import { Component, Input, OnInit, signal } from '@angular/core';
import { ProductImage } from '../../../models/product.model';
import { NgClass } from '@angular/common';
import { ImageZoomComponent } from "../image-zoom/image-zoom.component";

@Component({
  selector: 'app-image-preview',
  imports: [NgClass, ImageZoomComponent],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss'
})
export class ImagePreviewComponent {
  @Input() images: ProductImage[] = [];

  current_index = signal(0)



  onChangeImage(index: number) {
    this.current_index.set(index)
  }
}
