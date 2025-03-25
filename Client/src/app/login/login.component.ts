import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    accountService = inject(AccountService);
    router = inject(Router);
    private toastr = inject(ToastrService);
    model: any = {};

    login() {
        this.accountService.login(this.model).subscribe({
            next: response => {
                this.router.navigateByUrl('');
            },
            error: error => this.toastr.error(error.error)
            
        })
    }
}
