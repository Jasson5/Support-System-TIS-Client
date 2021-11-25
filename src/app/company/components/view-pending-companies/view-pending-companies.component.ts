import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Company } from 'src/app/models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-view-pending-companies',
  templateUrl: './view-pending-companies.component.html',
  styleUrls: ['./view-pending-companies.component.scss']
})
export class ViewPendingCompaniesComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  public companies: Company[]=[]
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.listCompanys().subscribe(companies =>{
      this.companies = companies;
    });
  }
}
