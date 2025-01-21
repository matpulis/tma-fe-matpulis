import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchSort } from '../../../models/search-sort.model';
import { Paginator } from '../../../models/paginator.model';

@Component({
  selector: 'app-results-controls',
  imports: [FormsModule],
  templateUrl: './results-controls.component.html',
})
export class ResultsControlsComponent {
  viewType = model.required<'grid' | 'list'>()
  limit = model.required<number>()
  orderBy = model.required<SearchSort>()
  paginator = model.required<Paginator>()
  filtersToggled = model.required<boolean>()

  refresh = output<void>();

  onLimitChange() {
    this.paginator().page = 1
    this.refresh.emit()
  }

  onToggleFilters() {
    this.filtersToggled.set(!this.filtersToggled())
  }
}
