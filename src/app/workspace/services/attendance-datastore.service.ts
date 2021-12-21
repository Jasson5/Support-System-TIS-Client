import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceDatastoreService {
  readonly ROOT_URL = `${environment.BACK_END_HOST}attendance/`;
  constructor(private http: HttpClient) { }

  add(attendance: Attendance) {
    return this.http.post<Attendance>(this.ROOT_URL, attendance);
  }

  list(companyName) {
    return this.http.get<Attendance[]>(this.ROOT_URL + 'find-by-company/' + companyName);
  }
}