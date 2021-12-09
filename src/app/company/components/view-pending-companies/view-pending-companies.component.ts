import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Company } from 'src/app/models/company';
import { CompanyStatusEnum } from 'src/app/models/enums/company-status-enum';
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
    this.companyService.listCompanys(CompanyStatusEnum.PENDING).subscribe(companies =>{
      this.companies = companies;
    });
  }
}
