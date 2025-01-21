import { Component } from '@angular/core';
import { ContainerComponent } from "../../layout/container/container.component";
import { ScrollToTopComponent } from "../scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-article-page',
  imports: [ContainerComponent, ScrollToTopComponent],
  templateUrl: './article-page.component.html',
})

export class ArticlePageComponent {

}
