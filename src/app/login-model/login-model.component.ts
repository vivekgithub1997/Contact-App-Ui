import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-model',
  standalone: false,
  templateUrl: './login-model.component.html',
  styleUrl: './login-model.component.css'
})
export class LoginModelComponent {

  @Output() close = new EventEmitter<void>();
email = '';
password = '';
isLoading = false;

   constructor( private  authService: AuthService,  private router: Router, private snackBar: MatSnackBar,private snack:MatSnackBar) {}
  
   
 Login() {
  this.isLoading = true; // Show loader
  this.authService.login(this.email, this.password).subscribe({
    next: (res: any) => {
      if (res && res.name) {
        this.authService.setUserId(res.id);
        this.authService.setLoginStatus(true);
        this.authService.setUserName(res.name);
        
        this.snackBar.open(`Welcome ${res.name}`, 'Close', { 
          duration: 3000 ,
          panelClass: ['snackbar-success']
        });
        
        
        this.router.navigate(['/dashboard']).then(() => {
         // Refresh the page after 1 second
       setTimeout(() => {
        this.isLoading = false; //hide  loader
         window.location.reload();
       }, 1000);
        });

      } else {
        
        this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 ,panelClass: ['snackbar-error'] });
        this.isLoading=false;
      }
    },
    error: (err: any) => {
      this.isLoading = false;
    
      let errorMsg = 'Login failed. Please try again.';
    
      if (err.status === 0) {
        // Backend is unreachable (network error)
        errorMsg = 'Unable to connect to the server. Please check your internet or try again later.';
      } else if (err.status >= 500) {
        // Server-side error
        errorMsg = 'Server error. Please try again later.';
      } else if (err.status === 401 || err.status === 403) {
        // Unauthorized or forbidden
        errorMsg = 'Invalid credentials. Please check your email and password.';
      } else if (err.error && typeof err.error === 'string') {
        // Custom error message from backend
        errorMsg = err.error;
      } else if (err.error?.message) {
        // Structured error message
        errorMsg = err.error.message;
      }
    
      this.snackBar.open(errorMsg, 'Close', { duration: 4000, panelClass: ['snackbar-error']  });
    }
  });


}


}
