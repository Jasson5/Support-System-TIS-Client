import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyDatastoreService } from './company-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public companyDatastoreService: CompanyDatastoreService) { }

  public addCompany(company, users) {
    let newCompany= new Company();
    newCompany.name = company.name;
    newCompany.phone = company.phone;
    newCompany.email = company.email;
    newCompany.adress = company.adress;

    return this.companyDatastoreService.add(newCompany);
  }

  public updateCompany(companyToEdit: Company, company) {
    companyToEdit.name = company.name;
    companyToEdit.phone = company.phone;
    companyToEdit.email = company.email;
    companyToEdit.adress = company.adress;

    return this.companyDatastoreService.update(companyToEdit);
  }

  public listCompanys() {
    return this.companyDatastoreService.list();
  }

  public findById(id) {
    return this.companyDatastoreService.findById(id);
  }
}
