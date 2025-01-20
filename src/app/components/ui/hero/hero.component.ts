import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
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
  private resizeSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.startAutoRotation();

    // Subscribe to window resize events
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.onResize();
    })

    // Initial call for the current window size
    this.onResize();
  }

  startAutoRotation(): void {
    interval(3500).subscribe(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.slides.length)
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.resizeSubscription?.unsubscribe();
  }

  private onResize(): void {
    this.containerWidth.set(this.sliderContainer()?.nativeElement.offsetWidth || 0)
  }
}
