import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './company/components/add-company/add-company.component';
import { ViewCompaniesComponent } from './company/components/view-companies/view-companies.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'add-company', component: AddCompanyComponent},
  {path: 'view-companies', component: ViewCompaniesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
