import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemestersComponent } from './components/semesters/semesters.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [SemestersComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    NgbModule,
    NgxSpinnerModule,
    FontAwesomeModule,
  ]
})
export class SemesterModule { }
