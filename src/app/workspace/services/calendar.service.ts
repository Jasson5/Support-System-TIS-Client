import { Injectable } from '@angular/core';
import { Calendar } from 'src/app/models/calendar';
import { CalendarDatastoreService } from './calendar-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private calendarDatastoreService: CalendarDatastoreService) { }

  public addCalendar(calendar) {
    let newCalendar = new Calendar();
    newCalendar.dayDate = calendar.dayDate;
    newCalendar.dayDescription = calendar.dayDescription;
    newCalendar.dayObservation = calendar.dayObservation;
    newCalendar.companyName = calendar.companyName;

    return this.calendarDatastoreService.add(newCalendar);
  }

  public updateCalendar(calendarToEdit: Calendar, calendar) {
    calendarToEdit.dayDescription = calendar.description;
    calendarToEdit.dayObservation = calendar.observation;

    return this.calendarDatastoreService.update(calendarToEdit);
  }

  public listCaledar(companyName,date) {
    return this.calendarDatastoreService.list(companyName,date);
  }
}
