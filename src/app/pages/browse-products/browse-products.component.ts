import { Location } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { BreadcrumbsComponent } from "../../components/ui/breadcrumbs/breadcrumbs.component";
import { PageControlsComponent } from "../../components/ui/page-controls/page-controls.component";
import { ProductCardComponent } from "../../components/ui/products/product-card/product-card.component";
import { ResultsControlsComponent } from "../../components/ui/results-controls/results-controls.component";
import { Paginator } from '../../models/paginator.model';
import { Product } from '../../models/product.model';
import { SearchSort } from '../../models/search-sort.model';
import { ProductsService } from '../../services/products.service';
import { fadeInOut } from '../../shared/animations';
import { ProductsStore } from '../../stores/products.store';

@Component({
  selector: 'app-browse-products',
  imports: [ContainerComponent, FormsModule, BreadcrumbsComponent, ProductCardComponent, PageControlsComponent, ResultsControlsComponent],
  templateUrl: './browse-products.component.html',
  animations: [fadeInOut],
})
export class BrowseProductsComponent implements OnInit {
  productsService = inject(ProductsService)
  productsStore = inject(ProductsStore)
  route = inject(ActivatedRoute)
  router = inject(Router)
  location = inject(Location)

  filtersToggled = signal(false)
  viewType = signal<'grid' | 'list'>('grid')
  products = signal<Product[]>([])
  orderBy = signal<SearchSort>('name_ASC')
  limit = signal(25)

  paginator = signal<Paginator>({
    page: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    total: 0,
  })

  filters = signal({
    query: '',
    categories: [] as string[]
  })

  categories = computed(() => this.productsStore.categories())

  constructor() {
    effect(() => {
      this.UpdateQueryParams()

    })
  }

  private UpdateQueryParams(): void {
    const queryParams = new URLSearchParams(window.location.search);

    if (this.filters().categories.length > 0) {
      queryParams.set('categories', this.filters().categories.join(','));
      queryParams.set('orderBy', this.orderBy());
      queryParams.set('limit', this.limit().toString());
    } else {
      queryParams.delete('categories');
    }

    // Update the URL without triggering navigation
    this.location.replaceState(
      window.location.pathname + '?' + queryParams.toString()
    );
  }

  IsCategoryChecked(slug: string) { return this.filters().categories.includes(slug) }

  onCategoryCheckChange(event: Event, slug: string): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.filters.set({
        query: this.filters().query,
        categories: [...this.filters().categories, slug]
      })
    } else {
      this.filters.set({
        query: this.filters().query,
        categories: this.filters().categories.filter((item) => item !== slug)
      })
    }

    this.paginator.set({
      ...this.paginator(),
      page: 1
    })

    this.filters().query = ''

    this.RefreshProducts()
  }

  onRemoveFilter(slug: string): void {
    this.filters.set({
      ...this.filters(),
      categories: this.filters().categories.filter(
        (item) => item !== slug
      ),
    });

    this.filters().query = ''

    this.RefreshProducts()
  }

  onClearAllFilters(): void {
    this.filters.set({
      query: '',
      categories: [],
    });
    this.RefreshProducts()
  }



  ParseQueryParams() {
    this.route.queryParams.subscribe(params => {
      if (params['categories']) {
        this.filters().categories = Array.isArray(params['categories']) ? params['categories'] : params['categories'].split(',')
      } else {
        this.filters().categories = []
      }

      if (params['query']) {
        this.filters().query = params['query']
      } else {
        this.filters().query = ''
      }

      this.RefreshProducts()
    });
  }

  RefreshProducts() {
    const paginator = this.paginator()

    const offset = paginator.page == 1 ? 0 : (paginator.page - 1) * this.limit()

    let limit = this.limit();
    limit = typeof limit === 'string' ? parseInt(limit) : this.limit()

    this.productsService
      .FilterPaginateProducts(this.filters().query, this.filters().categories, limit, offset, this.orderBy())
      .subscribe(response => {

        this.paginator.update(paginator => ({
          ...paginator,
          hasNextPage: response.data.productsConnection.pageInfo.hasNextPage,
          hasPreviousPage: response.data.productsConnection.pageInfo.hasPreviousPage,
          total: response.data.productsConnection.aggregate.count
        }))


        this.products.set(response.data.productsConnection.edges.map(item => item.node))
      })
  }





  ngOnInit(): void {
    this.ParseQueryParams()
    this.RefreshProducts()
  }
}