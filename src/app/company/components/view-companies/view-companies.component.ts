import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Company } from 'src/app/models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.scss']
})
export class ViewCompaniesComponent implements OnInit {

  faPlus = faPlus;
  public companies: Company[]=[]
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.listCompanys().subscribe(companies =>{
      this.companies = companies;
    });
  }

}
