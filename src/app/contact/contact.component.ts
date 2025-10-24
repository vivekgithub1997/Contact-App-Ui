import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../models/api-response.model';
import { ContactService } from '../service/contact.service';
import { AuthService } from '../service/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  
contacts: Contact[] = [];

displayedColumns: string[] = ['name', 'secondName', 'email', 'phone','description','actions'];
dataSource = new MatTableDataSource<Contact>();
@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private contactService: ContactService, private router: Router,private authService:AuthService,  private http: HttpClient,private snackBar: MatSnackBar,private snack:MatSnackBar) {}

  
ngOnInit(): void {
  
  const userId = this.authService.getUserId();
  console.log(userId);

  if (userId) {
    this.contactService.getContactsByUserId(userId).subscribe({
      next: (res) => {
        if (res.success) {
          this.contacts = res.data;
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Failed to fetch contacts.');
      }
    });
  } else {
    alert('User ID not found. Please log in again.');
  }
}


refreshContacts() {

  setInterval(() => {
    window.location.reload();
  }, 1000);
}

    





deleteContact(cid: number): void {
  const userId: number | null = this.authService.getUserId();
  const url = `http://localhost:8081/contact/${userId}/${cid}`;

  this.http.delete(url, { responseType: 'text' }).subscribe({
    next: (response) => {
      this.snackBar.open('One Contact Deleted', 'Close', { 
        duration: 3000 ,
        panelClass: ['snackbar-success']
      });
        this.ngOnInit();
    },
    error: (error) => {
      const errorMessage = error.error instanceof ProgressEvent
        ? 'Server is unreachable or did not respond properly.'
        : error.error;

      console.error('Error deleting contact:', error);
      this.snackBar.open('Failed to delete contact: ', 'Close',  { 
        duration: 3000 ,
        panelClass: ['snackbar-success']
      });
     
    }
  });
}



 




   
editContact(contact: any) {
  // Navigate to add-contact with contact data
  this.router.navigate(['/add-contact'], { state: { contact } });
}

}
