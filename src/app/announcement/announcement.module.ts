import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementEditorComponent } from './announcement-editor/announcement-editor.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [AnnouncementEditorComponent],
  imports: [
    CommonModule,    
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  exports: [
    AnnouncementEditorComponent
  ],
})
export class AnnouncementModule { }
