import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit {
  ngOnInit() {
    const loginStatus = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = loginStatus === 'true';
    this.userName = localStorage.getItem('userName') || '';
  }
  
  

  isLoggedIn = false;
  userName = '';
  constructor(private authService: AuthService, private router: Router) {}

 

logout() {
  this.authService.logout();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
  this.isLoggedIn = false;
  this.userName = '';
  this.router.navigate(['/']);
}





}
