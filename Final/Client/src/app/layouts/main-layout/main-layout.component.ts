import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/main-header.component";
import { RouterOutlet } from '@angular/router';
import { CoursesComponent } from "../../features/courses/courses.component";

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
