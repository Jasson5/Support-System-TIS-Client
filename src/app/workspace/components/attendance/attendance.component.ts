import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Company } from 'src/app/models/company';
import { AttendanceService } from '../../services/attendance.service';
import * as _ from 'lodash';
import { GradeAverage } from 'src/app/models/grade-average';

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
  public gradeAverages: GradeAverage[] = [];
  faSave = faSave;
  date;
  faPlus = faPlus;
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
      this.groupAttendances = this.agrupar(this.attendances);
      console.log(this.groupAttendances[0].listStudent)
    });

    this.attendanceService.listGradeByCompany(this.company.shortName).subscribe(gradeAverage => {
      this.gradeAverages = gradeAverage;
    });
  }

  agrupar(lista:Array<any>):Array<any>{
    var listaFechas = new Array<string>()
    for(let asistencia of lista){
        if(!listaFechas.includes(asistencia.attendanceDate)){
          listaFechas.push(asistencia.attendanceDate)
        }
    }
    var listaFinal:Array<any> = new Array<any>()
    for(let fecha of listaFechas){
      var listStudent: Array<any> = new Array<any>()
      for(let asistencia of lista){
        if(asistencia.attendanceDate == fecha){
          listStudent.push(asistencia)
        }
      }
      listaFinal.push({fecha,listStudent})
    }
    return listaFinal
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

  get status() {
    return this.attendanceEditorForm.get('status');
  }

  get grade() {
    return this.attendanceEditorForm.get('grade');
  }
}
