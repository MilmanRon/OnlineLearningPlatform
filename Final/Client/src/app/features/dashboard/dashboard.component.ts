import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../../data/store/user.store';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../core/domain/Models/user.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    userStore = inject(UserStore);
    router = inject(Router);
    Role = Role;

    constructor() {
        console.log(this.router.getCurrentNavigation()?.extras.state);
    }

}
