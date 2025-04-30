import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHeaderComponent } from "./components/auth-header/auth-header.component";
import { AuthComponent } from "../../features/auth/auth.component";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthHeaderComponent, AuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
