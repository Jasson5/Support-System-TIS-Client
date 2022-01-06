import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/authentication/models/user';
import { Semester } from 'src/app/models/semester';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemesterDatastoreService {
  readonly ROOT_URL = `${environment.BACK_END_HOST}semester`;

  constructor(private http: HttpClient) { }

  //Envia el semestre
  add(semester: Semester) {
    return this.http.post<Semester>(this.ROOT_URL, semester);
  }

  //Obtiene la lista de semestres
  list() {
    return this.http.get<Semester[]>(this.ROOT_URL);
  }

  //Obtiene la lista de estudiantes por semestre
  listUsersBySemester(search, semesterCode){
    return this.http.get<User[]>(this.ROOT_URL + '/list-users-by-semester?search=' + search + '&&code=' + semesterCode);
  }

  //Obtiene un semestre segun su codigo
  FindByCode(code){
    return this.http.get<Semester>(this.ROOT_URL+ '/' + code);
  }

  //Obtiene un usuario segun su id
  listByUserId(userId) {    
    return this.http.get<Semester[]>(this.ROOT_URL+'/list-by-user/'+ userId);
  }
  
  //El estudiante se une a un semestre con su codigo de clase
  JoinToSemester(userId, codeClassForJoin){
    return this.http.get<any>(this.ROOT_URL + '/join-to-semester/' + userId + '/' + codeClassForJoin);
  }
}
