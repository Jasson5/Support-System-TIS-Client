import { Injectable } from '@angular/core';
import { FinalGrade } from 'src/app/models/final-grade';
import { FinalGradeDatastoreService } from './final-grade-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class FinalGradeService {

  constructor(private finalGradeDatastoreService: FinalGradeDatastoreService) { }

  public updateFinalGrade(finalGradeToEdit: FinalGrade, finalGrade) {
    finalGradeToEdit.grade = finalGrade.finalGrade;

    return this.finalGradeDatastoreService.update(finalGradeToEdit);
  }

  public listFinalGrade(companyName) {
    return this.finalGradeDatastoreService.list(companyName);
  }
}
