import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { ScrollToTopComponent } from "../../components/ui/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-privacy-policy',
  imports: [ContainerComponent, ScrollToTopComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
