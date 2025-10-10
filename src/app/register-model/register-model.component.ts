import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-model',
  standalone: false,
  templateUrl: './register-model.component.html',
  styleUrl: './register-model.component.css'
})
export class RegisterModelComponent {

  @Output() close = new EventEmitter<void>();
 name = '';
 email = '';
 password = '';
 isLoading= false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar,) {}


  
  Signup() {
    this.isLoading = true;
  
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (res: any) => {
        this.snackBar.open(res.message || 'Registration Successful','Close', { duration: 3000 });
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
  
        let errorMsg = 'An error occurred. Please try again.';
  
        if (err.status === 0) {
          errorMsg = 'Unable to connect to the server. Please check your internet or try again later.';
        } else if (err.status >= 500) {
          errorMsg = 'Server error. Please try again later.';
        } else if (typeof err.error === 'string') {
          // ✅ Backend returned plain string (e.g., "User with this email is already registered.")
          errorMsg = err.error;
        } else if (err.error?.message) {
          // Structured error message
          errorMsg = err.error.message;
        }
  
        this.snackBar.open(errorMsg, 'Close', { duration: 4000 });
      }
    });
  }
  



}
