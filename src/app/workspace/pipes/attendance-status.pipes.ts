import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attendanceStatus'
})
export class AttendanceStatusPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Presente';
    }
    if (value == 2) {
      return 'Tarde';
    }
    if (value == 3) {
      return 'Falta';
    }
  }
}