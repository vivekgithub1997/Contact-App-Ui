import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  standalone: false,
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  isLoading = false;
contact = {
  name: '',
  secondName: '',
  email: '',
  phone: '',
  description: ''
 };

   
 constructor(private http: HttpClient,private router: Router,private authService:AuthService, private snackBar: MatSnackBar,private snack:MatSnackBar) {}

 submitContact(form: NgForm): void {
  this.isLoading = true;
  const userId = this.authService.getUserId();

  if (userId === null || userId === undefined) {
    alert('User ID not found. Please log in again.');
    this.isLoading = false;
    return;
  }

  const url = `http://localhost:8081/contact/add-contact/${userId}`;

  this.http.post(url, this.contact).subscribe({
    next: (response) => {
      console.log('Contact added successfully:', response);
      this.isLoading = false;

      this.snackBar.open('Contact added successfully', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });

      this.resetForm(form); // ✅ Reset the form here
    },
    error: (error) => {
      console.error('Error adding contact:', error);
      this.snackBar.open('Failed to save contact.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      this.isLoading = false;
    }
  });
}


 resetForm(form: NgForm) {
  form.resetForm();
  this.contact = {
    name: '',
    secondName: '',
    email: '',
    phone: '',
    description: ''
  };
  }

  

}
