import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { AttendanceDatastoreService } from './attendance-datastore.service';

@Injectable({
  providedIn: 'root'
})

//Esta clase hace uso de attendanceDatastoreService
export class AttendanceService {

  constructor(private attendanceDatastoreService: AttendanceDatastoreService) { }

  public addAttendance(attendance, user) {
    let newAttendance = new Attendance();
    newAttendance.attendanceStatus = attendance.attendanceStatus;
    newAttendance.attendanceDate = attendance.attendanceDate;
    newAttendance.attendanceGrade = attendance.grade;
    newAttendance.user = user;
    newAttendance.companyName = attendance.companyName;

    return this.attendanceDatastoreService.add(newAttendance);
  }

  public listAttendancesByCompanyName(companyName) {
    return this.attendanceDatastoreService.list(companyName);
  }

  public listGradeByCompany(companyName) {
    return this.attendanceDatastoreService.listGradeByCompany(companyName);
  }
}
