import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ViewPendingCompaniesComponent } from './components/view-pending-companies/view-pending-companies.component';



@NgModule({
  declarations: [AddCompanyComponent, ViewCompaniesComponent, ViewPendingCompaniesComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
  ]
})
export class CompanyModule { }
