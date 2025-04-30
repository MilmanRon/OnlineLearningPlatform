import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStore } from '../../../../data/store/user.store';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, UserDropdownComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
})
export class HeaderComponent {
  userStore = inject(UserStore);
  isDropdownOpen: boolean = false;

  @HostListener('document:click')
  onDocumentClick() {
    if (this.isDropdownOpen) this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
