import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './features/shared/components/modal/modal.component';
import { UserStorageService } from './infrastructure/services/user-storage.service';
import { UserStore } from './data/store/user.store';
import { ApiUserRepository } from './data/repositories/api-user.repository';
import { UserMapper } from './data/mappers/user.mapper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent],
  providers: [ApiUserRepository, UserMapper],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{

  title = 'Client';

  constructor() {

  }
}
