import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FinalGradeBySemester } from 'src/app/models/final-grade-by-semester';
import { FinalGradeService } from '../../services/final-grade.service';

@Component({
  selector: 'app-approved-students',
  templateUrl: './approved-students.component.html',
  styleUrls: ['./approved-students.component.scss']
})
export class ApprovedStudentsComponent implements OnInit {
  public finalGrades: FinalGradeBySemester[] = [];

  constructor(private finalGradeService: FinalGradeService,
    private auth: AuthService) { }

  //Obtiene la lista de los estudiantes con su nota final
  ngOnInit(): void {
    this.finalGradeService.listFinalGradeBySemester(this.auth.getSemester()).subscribe(finalGrade => {
      this.finalGrades = finalGrade;
    })
  }

}
