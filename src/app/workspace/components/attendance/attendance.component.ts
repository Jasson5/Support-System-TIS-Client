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
  public calendars: Calendar[] = [];
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
  ) {}

  //Se inicializa la vista de Asistencia tanto para el Administrador como para el Estudiante
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
          this.listCalendars();
        }
      }
    });
    this.buildFormAttendance();
    this.buidFormFinalGrade();
  }

  //Inicializa el formulario de Asistencias
  buildFormAttendance() {
    this.attendanceEditorForm = this.formBuilder.group({
      status: ['Presente'],
      grade: 0
    });
  }

  //Inicializa el formulario de Notas finales
  buidFormFinalGrade() {
    this.finalGradeForm = this.formBuilder.group({
      finalGrade: ['Nota final']
    });
  }

  //Muuestra la lista de Anotaciones existentes segun su fecha
  listCalendars(){
    this.spinner.show();
    this.calendarService.listCaledarByCompany(this.company.shortName).subscribe(calendars=>{
      this.calendars = calendars;
      this.spinner.hide();
    });
  }

  //Obtiene la lista de estudiantes con sus asistencias, notas semanales y fecha
  listAtenances() {
    this.spinner.show();
    this.attendanceService.listAttendancesByCompanyName(this.company.shortName).subscribe(attendances => {
      this.attendances = attendances;
      this.groupAttendances = this.agrupar(this.attendances);
      this.attendanceService.listGradeByCompany(this.company.shortName).subscribe(gradeAverage => {
        this.gradeAverages = gradeAverage;
        this.company.members.forEach(cm => {
          cm.gradeAverage = this.gradeAverages.find(g => g.id == cm.id);
        });
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

  //Agrupa por fecha a los estudiantes con sus asistencias y notas semanales
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

  //Crea una nueva fila de asistencias en la tabla
  createNewAttendance() {
    this.viewNewAttendance = true;
  }

  //Crea una nueva fila de anotaciones en la tabla
  createNewCalendar(){
    var calendar = new Calendar();
    var attendanceDate = this.calendar.getToday()
    calendar.companyName = this.company.shortName;
    calendar.dayDate = new Date(attendanceDate.year, attendanceDate.month - 1, attendanceDate.day);
    calendar.dayObservation = "Escriba aqui";
    calendar.dayDescription = "Escriba aqui";
    this.calendarService.addCalendar(calendar).subscribe(()=>{
      this.listCalendars();
      this.spinner.hide();
    },error=>{
      alert(error.error.error.message);
      this.spinner.hide();
    });
  }

  //Añade un nuevo registro de asistencia y nota semanal para un estudiante
  addAttendance(student) {
    var attendance = this.attendanceEditorForm.value;
    attendance.companyName = this.company.shortName;
    var attendanceDate = this.calendar.getToday()
    attendance.attendanceDate = new Date(attendanceDate.year, attendanceDate.month - 1, attendanceDate.day);
    attendance.attendanceStatus = attendance.status == 'Presente' ? 1 : attendance.status == 'Tarde' ? 2 : 3;
    this.attendanceService.addAttendance(attendance, student).subscribe(() => {
      alert("Se guardo la asistencia de: " + student.givenName)
    },error=>{
      alert(error.error.error.message);
      this.spinner.hide();
    });

  }

  //Actualiza la nota final de un estudiante
  updateFinalGrade(student) {
    this.spinner.show();
    var finalGrade = this.finalGradeForm.value;
    var finalGradeToEdit = this.finalGrades.find(f => f.userId == student.id);
    this.finalGradeService.updateFinalGrade(finalGradeToEdit, finalGrade).subscribe(() => {
      alert("La nota final fue guardada exitosamente");
      this.spinner.hide();
    })
  }

  //Muestra un modal con los campos de Lo que se reviso y Lo que se revisara
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

  //Obtiene el estado actual de la asistencia
  get status() {
    return this.attendanceEditorForm.get('status');
  }

  //Obtiene el estado actual de la nota semanal
  get grade() {
    return this.attendanceEditorForm.get('grade');
  }

  //Obtiene el estado actual de nota final
  get finalGrade() {
    return this.finalGradeForm.get('finalGrade');
  }
}
