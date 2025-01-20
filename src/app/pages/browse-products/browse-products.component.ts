import { Location } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { BreadcrumbsComponent } from "../../components/ui/breadcrumbs/breadcrumbs.component";
import { ProductCardComponent } from "../../components/ui/products/product-card/product-card.component";
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductsStore } from '../../stores/products.store';
import { ButtonComponent } from "../../components/ui/button/button.component";

@Component({
  selector: 'app-browse-products',
  imports: [ContainerComponent, FormsModule, BreadcrumbsComponent, ProductCardComponent, ButtonComponent],
  templateUrl: './browse-products.component.html',
  animations: [],
})
export class BrowseProductsComponent implements OnInit {
  productsService = inject(ProductsService)
  productsStore = inject(ProductsStore)
  route = inject(ActivatedRoute)
  router = inject(Router)
  location = inject(Location)
  filtersToggled = signal(false)

  viewType = signal<'grid' | 'list'>('grid')

  categories = computed(() => this.productsStore.categories())

  products = signal<Product[]>([])

  pagination = signal({
    page: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    total: 0,
    limit: 10,
  })

  orderBy = signal('name_ASC')

  filters = signal({
    categories: [] as string[]
  })

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
        categories: [...this.filters().categories, slug]
      })
    } else {
      this.filters.set({
        categories: this.filters().categories.filter((item) => item !== slug)
      })
    }

    this.pagination.set({
      ...this.pagination(),
      page: 1
    })

    this.RefreshProducts()
  }

  onRemoveFilter(slug: string): void {
    this.filters.set({
      ...this.filters(),
      categories: this.filters().categories.filter(
        (item) => item !== slug
      ),
    });

    this.RefreshProducts()
  }

  ParseQueryParams() {
    this.route.queryParams.subscribe(params => {
      if (params['categories']) {
        this.filters().categories = Array.isArray(params['categories']) ? params['categories'] : params['categories'].split(',')
      }
    });
  }

  RefreshProducts() {
    const pagination = this.pagination()

    const offset = pagination.page == 1 ? 0 : (pagination.page - 1) * pagination.limit


    this.productsService
      .FilterPaginateProducts(this.filters().categories, pagination.limit, offset, this.orderBy())
      .subscribe(response => {

        this.pagination.update(pagination => ({
          ...pagination,
          hasNextPage: response.data.productsConnection.pageInfo.hasNextPage,
          hasPreviousPage: response.data.productsConnection.pageInfo.hasPreviousPage,
          total: response.data.productsConnection.aggregate.count
        }))


        this.products.set(response.data.productsConnection.edges.map(item => item.node))
      })
  }

  onNextPage() {
    this.pagination.update(pagination => ({
      ...pagination,
      page: pagination.page + 1
    }))
    this.RefreshProducts()
  }


  onPrevPage() {
    this.pagination.update(pagination => ({
      ...pagination,
      page: pagination.page - 1
    }))
    this.RefreshProducts()
  }

  current_page_start = computed(() => {
    const value = this.pagination().page === 1 ? 1 : (this.pagination().limit * (this.pagination().page - 1)) + 1
    return this.pagination().total === 0 ? 0 : value
  })

  current_page_end = computed(() => {
    const value = this.pagination().limit * this.pagination().page

    return value > this.pagination().total ? this.pagination().total : value
  })

  onToggleFilters() {
    this.filtersToggled.set(!this.filtersToggled())
  }

  ngOnInit(): void {
    this.ParseQueryParams()
    this.RefreshProducts()
  }
}