import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  slides = [
    { image: 'assets/images/banners/banner-1.jpg', caption: 'Slide 1' },
    { image: 'assets/images/banners/banner-2.jpg', caption: 'Slide 2' },
    { image: 'assets/images/banners/banner-3.jpg', caption: 'Slide 3' },
  ];
  currentIndex = signal(0);
  containerWidth = signal(0);
  sliderContainer = viewChild<ElementRef>('sliderContainer');

  ngOnInit(): void {
    this.startAutoRotation();
    this.containerWidth.set(this.sliderContainer()?.nativeElement.offsetWidth || 0)
  }

  startAutoRotation(): void {
    interval(3500).subscribe(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.slides.length)
    });
  }
}
