import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AttendanceStatusPipe } from './pipes/attendance-status.pipes';
import { ApprovedStudentsComponent } from './components/approved-students/approved-students.component';



@NgModule({
  declarations: [WorkspaceComponent, HomeworksComponent, CalendarComponent, AttendanceComponent, AttendanceStatusPipe, ApprovedStudentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FontAwesomeModule,
  ],
  exports:[
    AttendanceComponent
  ],
  providers: [AttendanceStatusPipe]
})
export class WorkspaceModule { }
