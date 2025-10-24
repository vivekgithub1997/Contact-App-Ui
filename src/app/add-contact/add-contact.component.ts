import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-contact',
  standalone: false,
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  
       
isLoading = false;
isEditMode = false;

contact = {
  cid: null, // Add this to track contact ID
  name: '',
  secondName: '',
  email: '',
  phone: '',
  description: ''
};

constructor(
  private http: HttpClient,
  private router: Router,
  private authService: AuthService,
  private snackBar: MatSnackBar,
  private snack: MatSnackBar,
  private location: Location
) {
  const nav = this.location.getState() as any;
  if (nav.contact) {
    this.contact = { ...nav.contact };
    this.isEditMode = true;
  }
}

submitContact(form: NgForm): void {
  this.isLoading = true;

  if (this.isEditMode) {
    // Edit mode: send PUT request
    const userId = this.authService.getUserId();
    const updateUrl = `http://localhost:8081/contact/update/${userId}`;
    
 this.http.put(updateUrl, this.contact, { responseType: 'text' }).subscribe({
  next: (response) => {
    console.log('Contact updated successfully:', response);
    this.isLoading = false;
    this.snackBar.open('Contact updated successfully', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
    this.router.navigate(['/view']);
  },
  error: (error) => {
    console.error('Error updating contact:', error);
    this.snackBar.open('Failed to update contact.', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
    this.isLoading = false;
  }
});

  } else {
    // Add mode: send POST request
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
        this.resetForm(form);
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
}

resetForm(form: NgForm) {
  form.resetForm();
  this.contact = {
    cid: null,
    name: '',
    secondName: '',
    email: '',
    phone: '',
    description: ''
  };
  this.isEditMode = false;
}

  

}
