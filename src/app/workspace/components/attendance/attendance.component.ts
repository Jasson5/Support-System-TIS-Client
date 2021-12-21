import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Company } from 'src/app/models/company';
import { AttendanceService } from '../../services/attendance.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @Input() company: Company;
  @Input() reloadCompany: Subject<boolean> = new Subject<boolean>();
  public attendanceEditorForm: FormGroup;
  public attendance: Attendance;
  public attendances: Attendance[] = [];
  faSave = faSave;
  date;
  public newAttendance = false;
  public groupAttendances;

  constructor(
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    this.reloadCompany.subscribe(response => {
      if (response) {
        console.log(this.company);
        if (this.company !== null) {
          this.listAtenances();
        }
      }
    });
    this.buildFormAttendance();
  }

  buildFormAttendance() {
    this.attendanceEditorForm = this.formBuilder.group({
      status: ['Presente'],
      grade: 0
    });
  }

  listAtenances() {
    this.attendanceService.listAttendancesByCompanyName(this.company.shortName).subscribe(attendances => {
      this.attendances = attendances;
      this.groupAttendances = _.groupBy(this.attendances, function(attendance) {
        return "date";
      });      
      console.log(this.groupAttendances.date[0].attendanceDate )
    });
  }

  createNewAttendance(){
    this.newAttendance =true;
  }

  addAttendance(student) {
    var attendance = this.attendanceEditorForm.value;
    attendance.companyName = this.company.shortName;
    attendance.attendanceStatus = attendance.status == 'Presente' ? 1 : attendance.status == 'Tarde' ? 2 : 3;
    this.attendanceService.addAttendance(attendance, student).subscribe(() => {
      alert("Se guardo la asistencia de: " + student.givenName)
    });

  }

  updateAttendance(student) {
    var attendance = this.attendanceEditorForm.value;
    attendance.companyName = this.company.shortName;
    attendance.attendanceStatus = attendance.status == 'Presente' ? 1 : attendance.status == 'Tarde' ? 2 : 3;
    this.attendanceService.addAttendance(attendance, student).subscribe(() => {
      alert("Se guardo la asistencia de: " + student.givenName)
    });
  }

  get status() {
    return this.attendanceEditorForm.get('status');
  }

  get grade() {
    return this.attendanceEditorForm.get('grade');
  }
}
