import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendar } from 'src/app/models/calendar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarDatastoreService {
  readonly ROOT_URL = `${environment.BACK_END_HOST}calendar/`;
  constructor(private http: HttpClient) { }

  add(calendar: Calendar) {
    return this.http.post<Calendar>(this.ROOT_URL, calendar);
  }

  list(companyName,date) {
    return this.http.get<Calendar>(this.ROOT_URL + companyName + '/' + date);
  }

  update(calendar: Calendar) {
    return this.http.patch<Calendar>(this.ROOT_URL + calendar.id, calendar);
  }
}
