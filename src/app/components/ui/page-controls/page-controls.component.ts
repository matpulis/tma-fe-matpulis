import { Component, computed, input, model, output } from '@angular/core';
import { Paginator } from '../../../models/paginator.model';
import { ButtonComponent } from "../button/button.component";
import { ScrollToTop } from '../../../shared/helpers';

@Component({
  selector: 'app-page-controls',
  imports: [ButtonComponent],
  templateUrl: './page-controls.component.html',
})
export class PageControlsComponent {
  refresh = output<void>();
  limit = input.required<number>()
  paginator = model.required<Paginator>()


  onNextPage() {
    this.paginator.update(paginator => ({
      ...paginator,
      page: paginator.page + 1
    }))

    this.refresh.emit()

    ScrollToTop()
  }

  onPrevPage() {
    this.paginator.update(paginator => ({
      ...paginator,
      page: paginator.page - 1
    }))

    this.refresh.emit()

    ScrollToTop()
  }

  currentPageStart = computed(() => {
    const value = this.paginator().page === 1 ? 1 : (this.limit() * (this.paginator().page - 1)) + 1
    return this.paginator().total === 0 ? 0 : value
  })

  currentPageEnd = computed(() => {
    const value = this.limit() * this.paginator().page

    return value > this.paginator().total ? this.paginator().total : value
  })
}
