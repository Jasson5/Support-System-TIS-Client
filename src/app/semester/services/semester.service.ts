import { Injectable } from '@angular/core';
import { Semester } from 'src/app/models/semester';
import { SemesterDatastoreService } from './semester-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(public semesterDatastoreService: SemesterDatastoreService) { }

  public addSemester(name, code, status) {
    let newSemester = new Semester();
    newSemester.name = name;
    newSemester.code = code;
    newSemester.statusId = status;

    return this.semesterDatastoreService.add(newSemester);
  }

  public listSemesters() {
    return this.semesterDatastoreService.list();
  }  

  public FindSemesterByCode(code){
    return this.semesterDatastoreService.FindByCode(code);
  }

  public listSemestersByUserId(userId) {
    return this.semesterDatastoreService.listByUserId(userId);
  } 
  
  public listUsersBySemester(search: string, semesterCode: string) {
    return this.semesterDatastoreService.listUsersBySemester(search, semesterCode);
  }

  public JoinToSemester(userId, codeClassForJoin){
    return this.semesterDatastoreService.JoinToSemester(userId, codeClassForJoin);
  }
}
