import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyModule } from './company/company.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LanfingPageComponent } from './components/lanfing-page/lanfing-page.component';
import { AnnouncementModule } from './announcement/announcement.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementEditorComponent } from './announcement/announcement-editor/announcement-editor.component';
import { StickyNavModule } from 'ng2-sticky-nav';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { SemestersComponent } from './components/semesters/semesters.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LanfingPageComponent,
    StudentsListComponent,
    SemestersComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,    
    CompanyModule,
    AnnouncementModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StickyNavModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],  
  entryComponents: [AnnouncementEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
