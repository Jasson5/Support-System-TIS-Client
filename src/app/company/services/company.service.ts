import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyDatastoreService } from './company-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public companyDatastoreService: CompanyDatastoreService) { }

  public addCompany(company, users, semester) {
    let newCompany= new Company();
    newCompany.shortName = company.companyShortName;
    newCompany.longName = company.longCompanyName;
    newCompany.society = company.kindOfSociety;
    newCompany.cmpanyStatus = company.statusId;
    newCompany.semester = semester;
    newCompany.members = users;

    return this.companyDatastoreService.add(newCompany);
  }

  public approveCompany(company) {
    let companyToEdit= new Company();
    companyToEdit.shortName = company.shortName;
    companyToEdit.longName = company.longName;
    companyToEdit.society = company.society;
    companyToEdit.cmpanyStatus = company.cmpanyStatus;
    return this.companyDatastoreService.update(companyToEdit);
  }

  public listCompanys(statusId) {
    return this.companyDatastoreService.list(statusId);
  }

  public findById(id) {
    return this.companyDatastoreService.findById(id);
  }

  public deleteCompany(semesterCode) {
    return this.companyDatastoreService.delete(semesterCode);
  }

  public findByUserIdNSemester(userId, semesterCode) {    
    return this.companyDatastoreService.findByUserIdNSemester(userId, semesterCode);
  }

  public findCompaniesBySemester(semesterCode) {    
    return this.companyDatastoreService.findCompaniesBySemester(semesterCode);
  }
}
