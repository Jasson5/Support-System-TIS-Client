import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterUserComponent } from './authentication/components/register-user/register-user.component';
import { AddCompanyComponent } from './company/components/add-company/add-company.component';
import { ViewCompaniesComponent } from './company/components/view-companies/view-companies.component';
import { HomeComponent } from './components/home/home.component';
import { LanfingPageComponent } from './components/lanfing-page/lanfing-page.component';

const routes: Routes = [
  { path: '', component: LanfingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'view-companies', component: ViewCompaniesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
