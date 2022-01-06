import { Component, OnInit } from '@angular/core';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { Company } from 'src/app/models/company';
import { CompanyStatusEnum } from 'src/app/models/enums/company-status-enum';
import { CompanyService } from '../../services/company.service';
import { CompanyDetailModalComponent } from '../company-detail-modal/company-detail-modal.component';

@Component({
  selector: 'app-view-pending-companies',
  templateUrl: './view-pending-companies.component.html',
  styleUrls: ['./view-pending-companies.component.scss']
})
export class ViewPendingCompaniesComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  faPlus = faPlus;
  public companies: Company[]=[]
  public modalOptions: NgbModalOptions;

  constructor(
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    ) { }

  // Obtiene la lista de compañias
  ngOnInit(): void {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'sm',
      centered: true
    }
    this.spinner.show();
    this.companyService.listCompanys(CompanyStatusEnum.PENDING).subscribe(companies =>{
      this.companies = companies;
      this.spinner.hide();
    });
  }

  //Elimina la comnpañia al rechazar la solicitud
  deleteCompany(company): void {    
    this.modalOptions.size = 'sm';
    const modalRef = this.modalService.open(ConfirmationModalComponent, this.modalOptions);
    modalRef.componentInstance.message = `¿Está seguro de rechazar la solicitud  de ${company.shortName}?`;
    modalRef.componentInstance.title = "Eliminar solicitud";
    modalRef.result.then((result) => {
      if (result) {
        this.spinner.show();
        var rerult = this.companies.find(c => c.shortName == company.shortName);
        var index = this.companies.indexOf(rerult);

        if (index > -1) {
          this.companyService.deleteCompany(company.shortName).subscribe(() => {
            this.companies.splice(index, 1);
            alert("Solicitud rechazada exitosamente")
            this.spinner.hide();
          },
            error => {
              alert(error.message)
              this.spinner.hide();
            });
        }
      }
    });
  }

  //Acepta la solicitud de una compañia
  approveCompany(company){    
    this.modalOptions.size = 'sm';
    const modalRef = this.modalService.open(ConfirmationModalComponent, this.modalOptions);
    modalRef.componentInstance.message = `¿Está seguro de aceptar la solicitud  de ${company.shortName}?`;
    modalRef.componentInstance.title = "Aceptar solicitud";
    modalRef.result.then((result) => {
      if (result) {
        this.spinner.show();
        var rerult = this.companies.find(c => c.shortName == company.shortName);
        var index = this.companies.indexOf(rerult);

        if (index > -1) {
          company.cmpanyStatus = CompanyStatusEnum.APPROVED;
          this.companyService.approveCompany(company).subscribe(() => {
            this.companies.splice(index, 1);
            alert("Solicitud aceptada exitosamente")
            this.spinner.hide();
          },
            error => {
              alert(error.message)
              this.spinner.hide();
            });
        }
      }
    });
  }

  //Muestra los detalles de la compañia
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
