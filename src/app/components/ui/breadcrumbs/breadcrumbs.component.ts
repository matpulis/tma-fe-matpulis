import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadCrumbItem } from '../../../models/breadcrumb-item.model';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent {
  breadcrumbs = input.required<BreadCrumbItem[]>()
}
