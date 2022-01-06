import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { GradeAverage } from 'src/app/models/grade-average';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceDatastoreService {
  //Obtiene la ruta del EndPoint
  readonly ROOT_URL = `${environment.BACK_END_HOST}attendance/`;
  constructor(private http: HttpClient) { }

  //Registra una nueva asistencia
  add(attendance: Attendance) {
    return this.http.post<Attendance>(this.ROOT_URL, attendance);
  }

  //Obtiene la lista de asistencias por compañia
  list(companyName) {
    return this.http.get<Attendance[]>(this.ROOT_URL + 'find-by-company/' + companyName);
  }

  //Obtiene el promedio de notas de cada estudiante por compañia
  listGradeByCompany(companyName) {
    return this.http.get<GradeAverage[]>(this.ROOT_URL + 'grade-by-company/' + companyName);
  }
}
