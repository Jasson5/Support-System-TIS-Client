import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinalGrade } from 'src/app/models/final-grade';
import { FinalGradeBySemester } from 'src/app/models/final-grade-by-semester';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinalGradeDatastoreService {
  readonly ROOT_URL = `${environment.BACK_END_HOST}final-grade/`;
  constructor(private http: HttpClient) { }

  list(companyName) {
    return this.http.get<FinalGrade[]>(this.ROOT_URL + companyName);
  }

  listBySemester(semester) {
    return this.http.get<FinalGradeBySemester[]>(this.ROOT_URL +'by-semester/' + semester);
  }

  update(finalGrade: FinalGrade) {
    return this.http.patch<FinalGrade>(this.ROOT_URL + finalGrade.id, finalGrade);
  }
}
