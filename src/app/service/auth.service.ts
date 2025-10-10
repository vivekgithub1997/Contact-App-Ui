import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: number | null = null;
  private users: any[] = [];

 
  private baseUrl = 'http://54.164.140.83:8081/api/auth'; 
 
 constructor(private http: HttpClient, private router: Router ) {}
  
 
   
 

 



login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, { email, password });
}

 
   
signup(name: string, email: string, password: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/register`, { name, email, password }, { responseType: 'text' });
}


setLoginStatus(status: boolean) {
  localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
}

isAuthenticated(): boolean {
  return localStorage.getItem('isLoggedIn') === 'true';
}

setUserName(name: string) {
  localStorage.setItem('userName', name);
}

logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
}
 
 
setUserId(id: number | undefined | null) {
  if (id !== undefined && id !== null) {
    this.userId = id;
    localStorage.setItem('userId', id.toString());
  } else {
    console.warn('Attempted to set undefined/null userId');
  }
}


 getUserId(): number | null {
  const storedId = localStorage.getItem('userId');
  return storedId ? +storedId : this.userId;
 }
  
 
}
