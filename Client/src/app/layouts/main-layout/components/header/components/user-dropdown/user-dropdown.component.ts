import { Component, inject } from '@angular/core';
import { UserStore } from '../../../../../../data/store/user.store';
import { Router, RouterLink } from '@angular/router';
import { UserStorageService } from '../../../../../../infrastructure/services/user-storage.service';

@Component({
  selector: 'app-user-dropdown',
  imports: [RouterLink],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.css'
})
export class UserDropdownComponent {
    userStore = inject(UserStore);
    userLocalStorageService = inject(UserStorageService);
    router = inject(Router)

    logout(){
        this.userStore.clearUser();
        this.userLocalStorageService.clearUser();
        this.router.navigateByUrl('');
    }

}
