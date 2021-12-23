import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { Company } from 'src/app/models/company';
import { AttendanceService } from '../../services/attendance.service';
import * as _ from 'lodash';
import { GradeAverage } from 'src/app/models/grade-average';
import { AttendanceStatusPipe } from '../../pipes/attendance-status.pipes';
import { FinalGradeService } from '../../services/final-grade.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FinalGrade } from 'src/app/models/final-grade';
import { NgbCalendar, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarService } from '../../services/calendar.service';
import { Calendar } from 'src/app/models/calendar';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @Input() company: Company;
  @Input() reloadCompany: Subject<boolean> = new Subject<boolean>();
  public attendanceEditorForm: FormGroup;
  public finalGradeForm: FormGroup;
  public attendance: Attendance;
  public attendances: Attendance[] = [];
  public gradeAverages: GradeAverage[] = [];
  public finalGrades: FinalGrade[] = [];
  public modalOptions: NgbModalOptions;
  faSave = faSave;
  date;
  faPlus = faPlus;
  public viewNewAttendance = false;
  public groupAttendances;
  public show= false;
  public isAdmin;

  constructor(
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService,
    private attendanceStatus: AttendanceStatusPipe,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
    private modalService: NgbModal,
    private finalGradeService: FinalGradeService,
    private calendarService: CalendarService,    
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.date = new Date();        
    this.isAdmin = this.auth.getRoles().includes('Admin');
    this.viewNewAttendance = !this.isAdmin;
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'sm',
      centered: true
    }
    this.reloadCompany.subscribe(response => {
      if (response) {
        if (this.company !== null) {
          this.listAtenances();
        }
      }
    });
    this.buildFormAttendance();
    this.buidFormFinalGrade();
  }

  buildFormAttendance() {
    this.attendanceEditorForm = this.formBuilder.group({
      status: ['Presente'],
      grade: 0
    });
  }

  buidFormFinalGrade() {
    this.finalGradeForm = this.formBuilder.group({
      finalGrade: ['Nota final']
    });
  }

  listAtenances() {
    this.spinner.show();
    this.attendanceService.listAttendancesByCompanyName(this.company.shortName).subscribe(attendances => {
      this.attendances = attendances;
      this.groupAttendances = this.agrupar(this.attendances);
      this.attendanceService.listGradeByCompany(this.company.shortName).subscribe(gradeAverage => {
        this.gradeAverages = gradeAverage;
        this.finalGradeService.listFinalGrade(this.company.shortName).subscribe(finalGrade => {
          this.finalGrades = finalGrade;
          this.company.members.forEach(cm => {
            cm.finalGrade = this.finalGrades.find(f => f.userId == cm.id);
          });
          this.spinner.hide();
          this.show = true;
        });
      });
    });
  }

  agrupar(lista: Array<any>): Array<any> {
    var listaFechas = new Array<string>()
    for (let asistencia of lista) {
      if (!listaFechas.includes(asistencia.attendanceDate)) {
        listaFechas.push(asistencia.attendanceDate)
      }
    }
    var listaFinal: Array<any> = new Array<any>()
    for (let fecha of listaFechas) {
      var listStudent: Array<any> = new Array<any>()
      for (let asistencia of lista) {
        if (asistencia.attendanceDate == fecha) {
          listStudent.push(asistencia)
        }
      }
      listaFinal.push({ fecha, listStudent })
    }
    return listaFinal
  }

  createNewAttendance() {
    this.spinner.show();
    this.viewNewAttendance = true;
    var calendar = new Calendar();
    var attendanceDate = this.calendar.getToday()
    calendar.companyName = this.company.shortName;
    calendar.dayDate = new Date(attendanceDate.year, attendanceDate.month - 1, attendanceDate.day);
    calendar.dayObservation = "Escriba aqui";
    calendar.dayDescription = "Escriba aqui";
    this.calendarService.addCalendar(calendar).subscribe(()=>{
      this.spinner.hide();
    },error=>{
      alert(error.error.error.message);
      this.spinner.hide();
    }
    );
  }

  addAttendance(student) {
    var attendance = this.attendanceEditorForm.value;
    attendance.companyName = this.company.shortName;
    var attendanceDate = this.calendar.getToday()
    attendance.attendanceDate = new Date(attendanceDate.year, attendanceDate.month - 1, attendanceDate.day);
    attendance.attendanceStatus = attendance.status == 'Presente' ? 1 : attendance.status == 'Tarde' ? 2 : 3;
    this.attendanceService.addAttendance(attendance, student).subscribe(() => {
      alert("Se guardo la asistencia de: " + student.givenName)
    });

  }

  updateFinalGrade(student) {
    this.spinner.show();
    var finalGrade = this.finalGradeForm.value;
    var finalGradeToEdit = this.finalGrades.find(f => f.userId == student.id);
    this.finalGradeService.updateFinalGrade(finalGradeToEdit, finalGrade).subscribe(() => {
      alert("La nota final fue guardada exitosamente");
      this.spinner.hide();
    })
  }

  
  open(date){
    var attendanceDate = this.calendar.getToday()
    date== null ?  new Date(attendanceDate.year, attendanceDate.month - 1, attendanceDate.day): date;
    this.modalOptions.size = 'xl';
    const modalRef = this.modalService.open(CalendarComponent, this.modalOptions);
    modalRef.componentInstance.data = {
      companyName: this.company.shortName,
      date: date
    };
  }

  get status() {
    return this.attendanceEditorForm.get('status');
  }

  get grade() {
    return this.attendanceEditorForm.get('grade');
  }

  get finalGrade() {
    return this.finalGradeForm.get('finalGrade');
  }
}
