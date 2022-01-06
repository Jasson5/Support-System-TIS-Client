import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { CompanyService } from 'src/app/company/services/company.service';
import { Company } from 'src/app/models/company';
import { PdfService } from 'src/app/services/pdf.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public companyName = "Selecciones una empresa"
  public isAdmin;
  public companies: Company[] = [];
  public companiesForUser: Company[] = [];
  public company: Company = null;
  public reloadCompany: Subject<boolean> = new Subject<boolean>();

  constructor(
    private auth: AuthService,
    private companyService: CompanyService,
    private reportService: ReportService,    
    private spinner: NgxSpinnerService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    //Se guarda en la variable isAdmin si el usuario es Administrador un valor Booleano
    this.isAdmin = this.auth.getRoles().includes('Admin');
    this.listCompanies();
  }

  //Se obtienen las compañias correspondientes al semestre
  listCompanies() {
    if (this.isAdmin) {
      this.companyService.findCompaniesBySemester(this.auth.getSemester()).subscribe((company) => {
        this.companies = company;
      })
    } else {
      this.companyService.findCompaniesBySemester(this.auth.getSemester()).subscribe((companies) => {
        this.companiesForUser = companies;
        this.companiesForUser.forEach((company) => {
          if(company.members.find(cm => cm.id == parseInt(this.auth.getUserId()))){
            this.companies.push(company);
          }

        })
      })
    }

  }

  selectCompany(company) {
    this.company = company;
    this.companyName = company.longName;
    this.reloadCompany.next(true);
  }

  generateReport(){
    this.spinner.show();
    this.reportService.getPdf(this.auth.getSemester()).subscribe(pdf => {
      this.pdfService.Open(pdf);
      this.spinner.hide();
    },
      (error) => {
        alert(error.message);
        this.spinner.hide();
      });
  }
}
