import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCompaniesComponent } from './components/view-companies/view-companies.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AddCompanyComponent, ViewCompaniesComponent],
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
