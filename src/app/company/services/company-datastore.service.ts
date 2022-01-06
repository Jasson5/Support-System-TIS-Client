import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/company';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyDatastoreService {
  readonly ROOT_URL = `${environment.BACK_END_HOST}company/`;

  constructor(private http: HttpClient) { }

  //Agrega una nueva compañia
  add(company: Company) {
    return this.http.post<Company>(this.ROOT_URL, company);
  }
  
  //Actualiza una compañia
  update(company: Company) {
    return this.http.patch<Company>(this.ROOT_URL, company);
  }

  //Obtiene la lista de compañias
  list(statusId) {
    return this.http.get<Company[]>(this.ROOT_URL + statusId);
  }

  //Obtiene una compañia segun su id
  findById(id) {
    return this.http.get<Company>(this.ROOT_URL + id);
  }

  //Obtiene un usuario segun su id
  public findByUserIdNSemester(userId, semesterCode) {
    return this.http.get<Company>(this.ROOT_URL + 'user-and-company' + userId + '/' + semesterCode);
  }

  // Elimina una compañia
  delete(semesterCode) {
    return this.http.delete<Company>(this.ROOT_URL + semesterCode);
  }

  //Obtiene una lista de compañias segun el codigo de semestre
  public findCompaniesBySemester(semesterCode) {
    return this.http.get<Company[]>(this.ROOT_URL + 'find-by-semester/' + semesterCode);
  }
}
