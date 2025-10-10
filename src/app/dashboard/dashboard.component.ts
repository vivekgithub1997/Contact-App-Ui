import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  
userName = '';
contacts = [];

ngOnInit() {
  this.userName = localStorage.getItem('userName') || '';
  this.loadContacts();
}
constructor( private  authService: AuthService,  private router: Router, private snackBar: MatSnackBar,private snack:MatSnackBar) {}
  
loadContacts() {
  // Call service to fetch contacts
  
}

logout() {
  localStorage.clear();
  this.router.navigate(['/login']);
}


}
