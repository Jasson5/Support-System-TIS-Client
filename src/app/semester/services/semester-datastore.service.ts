import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/authentication/models/user';
import { Semester } from 'src/app/models/Semester';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemesterDatastoreService {
  readonly ROOT_URL = `${environment.BACK_END_HOST}semester`;

  constructor(private http: HttpClient) { }

  add(semester: Semester) {
    return this.http.post<Semester>(this.ROOT_URL, semester);
  }

  list() {
    return this.http.get<Semester[]>(this.ROOT_URL);
  }

  listUsersBySemester(search, semesterCode){
    return this.http.get<User[]>(this.ROOT_URL + '/list-users-by-semester?search=' + search + '&&code=' + semesterCode);
  }

  FindByCode(code){
    return this.http.get<Semester[]>(this.ROOT_URL+ '/' + code);
  }

  listByUserId(userId) {    
    return this.http.get<Semester[]>(this.ROOT_URL+'/list-by-user/'+ userId);
  }
  
  JoinToSemester(userId, codeClassForJoin){
    return this.http.get<any>(this.ROOT_URL + '/join-to-semester/' + userId + '/' + codeClassForJoin);
  }
}
