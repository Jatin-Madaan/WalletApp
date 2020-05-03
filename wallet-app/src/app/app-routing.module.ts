import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ServicesOfferedComponent } from './components/services-offered/services-offered.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AccountComponent } from './components/account/account.component';


const routes: Routes = [
  { path : 'home', component:HomeComponent },
  { path : 'services', component:ServicesOfferedComponent},
  { path : 'aboutus', component:AboutusComponent},
  { path : 'signup', component:RegisterUserComponent },
  { path : 'account', component:AccountComponent },
  { path : '**', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
