import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { ScrollToTopComponent } from "../../components/ui/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-terms-conditions',
  imports: [ContainerComponent, ScrollToTopComponent],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {

}
