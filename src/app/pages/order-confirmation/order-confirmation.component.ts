import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/layout/container/container.component";
import { ButtonComponent } from "../../components/ui/button/button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  imports: [ContainerComponent, ButtonComponent, RouterLink],
  templateUrl: './order-confirmation.component.html',
})
export class OrderConfirmationComponent {


}
