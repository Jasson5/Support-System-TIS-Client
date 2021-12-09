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

  add(company: Company) {
    return this.http.post<Company>(this.ROOT_URL, company);
  }

  update(company: Company) {
    return this.http.patch<Company>(this.ROOT_URL + company.companyId, company);
  }

  list(statusId) {
    return this.http.get<Company[]>(this.ROOT_URL + statusId);
  }

  findById(id) {
    return this.http.get<Company>(this.ROOT_URL + id);
  }
}
