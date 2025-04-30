import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/main-header.component';
import { RouterOutlet } from '@angular/router';
import { ApiUserRepository } from '../../data/repositories/api-user.repository';
import { UserStore } from '../../data/store/user.store';
import { UserStorageService } from '../../infrastructure/services/user-storage.service';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  userStore = inject(UserStore);
  userLocalStorageService = inject(UserStorageService);
  apiUserRepository = inject(ApiUserRepository);
  
  ngOnInit(): void {
    console.log(
      `App init status: \nUserSig: ${
        this.userStore.user() ? 'true' : 'false'
      }\nUserLocalStorage: ${
        this.userLocalStorageService.currentUserFromLocalStorage()
          ? 'true'
          : 'false'
      }`
    );
  }
}
