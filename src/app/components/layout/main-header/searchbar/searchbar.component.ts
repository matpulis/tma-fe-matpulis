import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, tap } from 'rxjs';
import { Product } from '../../../../models/product.model';
import { HighlightPipe } from '../../../../pipe/highlight.pipe';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-searchbar',
  imports: [NgClass, ReactiveFormsModule, HighlightPipe, RouterLink],
  templateUrl: './searchbar.component.html',
  animations: [
    trigger('resultsAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        }),
        animate('300ms ease', style({
          opacity: 1,
          transform: 'translateY(0)',
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
        animate('300ms ease', style({
          opacity: 0,
          transform: 'translateY(20px)',
        }))
      ]),
    ]),

  ],
})
export class SearchbarComponent implements OnInit {
  mobileMenuOpen = signal(false)

  searchContainer = viewChild<ElementRef>('searchContainer')

  // Highlight
  highlightWidth = signal(0);
  onFocus() {
    this.highlightWidth.set(this.searchContainer()?.nativeElement.offsetWidth);
    this.SearchProducts(this.searchQuery.value || '');
  }

  onBlur() {
    this.searchQuery.reset();
    this.highlightWidth.set(0);

    // Timeout to let click event go trough before hiding results
    setTimeout(() => this.show_results.set(false), 100)
  }

  // Search Products
  show_results = signal<boolean>(false);
  productsService = inject(ProductsService);
  searching = signal<boolean>(false);
  results = signal<Product[]>([]);
  searchQuery = new FormControl('');

  SearchProducts(query: string) {


    if (query.length > 0) {
      this.productsService.SearchProducts(query).subscribe(response => {
        this.searching.set(false)
        this.show_results.set(true)

        this.results.set(response.data.products)
      });
    } else {
      this.searching.set(false)
    }
  }
  ngOnInit() {
    this.searchQuery.valueChanges
      .pipe(tap(() => this.searching.set(true)), debounceTime(750)) // 1 second debounce
      .subscribe(query => {
        this.SearchProducts(query || '');
      });
  }

  onClick(event: Event, product: Product) {
    event.stopImmediatePropagation();
    this.results.set([]);
    this.mobileMenuOpen.set(false)
  }

  onToggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen())
  }
}
