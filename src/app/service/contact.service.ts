import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Contact } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  
 private baseUrl = 'http://54.164.140.83:8081/contact';

 constructor(private http: HttpClient) {}

 getContactsByUserId(userId: number): Observable<ApiResponse<Contact[]>> {
  return this.http.get<ApiResponse<Contact[]>>(`${this.baseUrl}/getAllContactByUserId/${userId}`);
}
}


