import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginModelComponent } from './login-model/login-model.component';
import { RegisterModelComponent } from './register-model/register-model.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginModelComponent},
  {path:'register',component:RegisterModelComponent},
  {path:'about',component:AboutComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'view',component:ContactComponent},
  {path:'add-contact',component:AddContactComponent},
  {path:'profile',component:ProfileComponent},
  {path:'**',component:PageNotFoundComponent}
  
];

// const routes: Routes = [
//   {
//     path: '',
//     component: AppComponent,
//     children: [
//       { path: '', component: HomeComponent },
//       { path: 'login', component: LoginModelComponent },
//       { path: 'register', component: RegisterModelComponent },
//       { path: 'about', component: AboutComponent },
//       {path:'dashboard',component:DashboardComponent},
//       {path:'view-contact',component:ContactComponent}
//     ]
//   },
//   {
//     path: '',
//     component: DashboardComponent,
//        children: [
        
      
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
