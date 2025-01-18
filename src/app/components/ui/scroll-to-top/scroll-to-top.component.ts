import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [NgClass],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  show = signal(false)

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  updateScrollProgress = (event: Event) => {
    const progressPath = document.getElementById('progress-path')

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercent = (scrollTop / scrollHeight) * 100


    if (scrollPercent >= 10) {
      this.show?.set(true);
    } else if (scrollPercent < 10) {
      this.show?.set(false);
    }

    // Set the stroke-dasharray to visually show progress
    progressPath?.setAttribute('stroke-dasharray', `${scrollPercent}, 100`)
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.updateScrollProgress)
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.updateScrollProgress);
  }
}
