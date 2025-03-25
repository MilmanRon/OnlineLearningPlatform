import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { routes } from '../app.routes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    private accountService = inject(AccountService);
    private router = inject(Router);
    private toastr = inject(ToastrService);
    model: any = {}

    register(){
        this.accountService.register(this.model).subscribe({
            next: response => {
                console.log(response)
                this.router.navigateByUrl('/home');
            },
            error: error => this.toastr.error(error.error)
        })
    }
}
