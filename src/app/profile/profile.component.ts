import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  
user = {
  id: 'SCM-USER-1',
  name: '-',
  email: '-',
  role: 'ROLE_USER',
  active: true,
  about: '-'
};


}
