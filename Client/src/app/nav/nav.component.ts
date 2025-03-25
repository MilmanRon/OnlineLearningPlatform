import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { RouterLink } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink,  BsDropdownModule, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    accountService = inject(AccountService);

    logout(){
        localStorage.removeItem('user');
        this.accountService.currentUser.set(null);
    }
}
