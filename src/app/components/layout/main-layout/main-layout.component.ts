import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFooterComponent } from "../main-footer/main-footer.component";
import { MainHeaderComponent } from "../main-header/main-header.component";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MainHeaderComponent, MainFooterComponent,],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {

}
