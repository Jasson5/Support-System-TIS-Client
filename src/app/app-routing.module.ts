import { SemestersComponent } from './components/semesters/semesters.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterUserComponent } from './authentication/components/register-user/register-user.component';
import { AddCompanyComponent } from './company/components/add-company/add-company.component';
import { ViewCompaniesComponent } from './company/components/view-companies/view-companies.component';
import { ViewPendingCompaniesComponent } from './company/components/view-pending-companies/view-pending-companies.component';
import { HomeComponent } from './components/home/home.component';
import { LanfingPageComponent } from './components/lanfing-page/lanfing-page.component';
import { EditCompanyComponent } from './company/components/edit-company/edit-company.component';

const routes: Routes = [
  { path: '', component: LanfingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'view-companies', component: ViewCompaniesComponent },
  { path: 'view-pending-companies', component: ViewPendingCompaniesComponent },
  { path: 'students-list', component: StudentsListComponent },
  { path: 'edit-company', component: EditCompanyComponent },
  { path: 'semesters', component: SemestersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 64]})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
