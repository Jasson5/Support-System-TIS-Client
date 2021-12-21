import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Company } from 'src/app/models/company';
import { CompanyStatusEnum } from 'src/app/models/enums/company-status-enum';
import { CompanyService } from '../../services/company.service';
import { CompanyDetailModalComponent } from '../company-detail-modal/company-detail-modal.component';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.scss']
})
export class ViewCompaniesComponent implements OnInit {

  faPlus = faPlus;
  public companies: Company[]=[]
  public modalOptions: NgbModalOptions;
  constructor(private companyService: CompanyService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'sm',
      centered: true
    }
    this.companyService.listCompanys(CompanyStatusEnum.APPROVED).subscribe(companies =>{
      this.companies = companies;
      console.log(this.companies)
    });
  }
  viewCOmpanyDetail(company){    
    this.modalOptions.size = 'md';
    const modalRef = this.modalService.open(CompanyDetailModalComponent, this.modalOptions);
    modalRef.componentInstance.data = {
      companyName: company.longName,
      semester: company.semester.name,
      members: company.members,
    };
  }
}
