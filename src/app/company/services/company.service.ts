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

  public updateCompany(companyToEdit: Company, company) {
    // companyToEdit.name = company.name;
    // companyToEdit.phone = company.phone;
    // companyToEdit.email = company.email;
    // companyToEdit.adress = company.adress;

    return this.companyDatastoreService.update(companyToEdit);
  }

  public listCompanys(statusId) {
    return this.companyDatastoreService.list(statusId);
  }

  public findById(id) {
    return this.companyDatastoreService.findById(id);
  }
}
