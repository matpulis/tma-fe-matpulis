import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  breadcrumbs = input<{
    title?: string,
    icon?: string,
    route?: string
    queryParams?: Record<string, string>
  }[]>([])
}
