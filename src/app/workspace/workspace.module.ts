import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { HomeworksComponent } from './components/homeworks/homeworks.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AttendanceComponent } from './components/attendance/attendance.component';



@NgModule({
  declarations: [WorkspaceComponent, HomeworksComponent, CalendarComponent, AttendanceComponent],
  imports: [
    CommonModule
  ],
  exports:[
    AttendanceComponent
  ],
})
export class WorkspaceModule { }
